import type { Edge } from "@antv/x6";
import { ApiLinkSingleItem_Result } from "@cnbn/engine";
import {
    buildLinkFromEdge,
    getEdgeData,
    hasIncomingOnPort,
    resolveEdgeEndpoints,
    setEdgeData,
    toStoredEdgeEndpoints,
    withLinkId,
} from "@gately/shared/infrastructure/ui-engine/lib";
import {
    logicClassToValue,
    pickLogicValueClass,
} from "@gately/shared/infrastructure/ui-engine/lib/logic-values";
import type { BridgeRuntime } from "./runtime";

type WorkspaceEdgeData = {
    linkId?: string;
    endpoints?: {
        input: { itemId: string; pin: string; portId: string };
        output: { itemId: string; pin: string; portId: string };
    };
};

const applyInputValue = (
    runtime: BridgeRuntime,
    input: { itemId: string; pin: string },
    value: ReturnType<typeof logicClassToValue>,
) => {
    runtime.uiEngine.services()?.signals?.applyPinPatch({
        elementId: input.itemId,
        pinRef: {
            side: "input",
            index: input.pin,
        },
        value,
    });
};

const applyConnectedInputFromOutput = (
    runtime: BridgeRuntime,
    endpoints: NonNullable<ReturnType<typeof resolveEdgeEndpoints>>,
) => {
    const outputView = runtime.graph.findViewByCell(endpoints.output.node) as
        | { findPortElem?: (portId: string, selector?: string) => Element | null }
        | undefined;
    const liveClass = outputView
        ?.findPortElem?.(endpoints.output.portId, "circle")
        ?.getAttribute("class");
    const outputClass =
        liveClass ??
        endpoints.output.node.getPortProp<string>(endpoints.output.portId, "attrs/circle/class") ??
        "";
    const valueClass = pickLogicValueClass(outputClass);
    applyInputValue(runtime, endpoints.input, logicClassToValue(valueClass));
};

const applyInputHighZAfterUnlink = (runtime: BridgeRuntime, edge: Edge) => {
    const live = resolveEdgeEndpoints(edge);
    const stored = getEdgeData<WorkspaceEdgeData>(edge).endpoints;
    const input = live?.input ?? stored?.input;
    if (!input) return;

    const targetCell = runtime.graph.getCellById(input.itemId);
    if (targetCell && targetCell.isNode?.()) {
        if (hasIncomingOnPort(runtime.graph, targetCell, input.portId, edge.id)) return;
    }

    applyInputValue(runtime, input, "Z");
};

export const createEdgeHandlers = (runtime: BridgeRuntime) => {
    const onEdgeConnected = async ({ edge }: { edge: Edge }) => {
        if (runtime.isSilent()) return;

        const tabId = runtime.getActiveTabId();
        if (!tabId) return;

        const endpoints = resolveEdgeEndpoints(edge);
        const link = buildLinkFromEdge(edge);
        if (!endpoints || !link) return;

        // applyConnectedInputFromOutput(runtime, endpoints);
        setEdgeData<WorkspaceEdgeData>(edge, {
            endpoints: toStoredEdgeEndpoints(endpoints),
        });

        const token = { cancelled: false };
        runtime.pendingLinks.set(edge.id, token);

        try {
            const res = (await runtime.runCommand(tabId, () =>
                runtime.logicEngine.call("/item/link", { tabId, link }),
            )) as ApiLinkSingleItem_Result;

            if (token.cancelled) {
                await runtime.runCommand(tabId, () =>
                    runtime.logicEngine.call("/item/unlink", { tabId, linkId: res.linkId }),
                );
                return;
            }

            runtime.withSilent(() => {
                withLinkId(edge, res.linkId);
            });
        } catch (err) {
            console.error("[workspace-bridge] link failed", err);
            runtime.withSilent(() => {
                edge.remove();
            });
        } finally {
            runtime.pendingLinks.delete(edge.id);
        }
    };

    const onEdgeRemoved = async ({ edge }: { edge: Edge }) => {
        if (runtime.isSilent()) return;

        applyInputHighZAfterUnlink(runtime, edge);

        const tabId = runtime.getActiveTabId();
        if (!tabId) return;

        const linkId = getEdgeData<WorkspaceEdgeData>(edge).linkId;
        if (!linkId) {
            const pending = runtime.pendingLinks.get(edge.id);
            if (pending) pending.cancelled = true;
            return;
        }

        try {
            await runtime.runCommand(tabId, () =>
                runtime.logicEngine.call("/item/unlink", { tabId, linkId }),
            );
        } catch (err) {
            console.error("[workspace-bridge] unlink failed", err);
        }
    };

    return {
        onEdgeConnected,
        onEdgeRemoved,
    };
};
