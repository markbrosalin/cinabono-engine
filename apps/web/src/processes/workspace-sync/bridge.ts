import type { Edge, Graph, Node } from "@antv/x6";
import type { CinabonoClient } from "@cnbn/engine-worker";
import type { ItemLink, LogicValue } from "@cnbn/schema";
import type { ScopeModel } from "@gately/entities/model/Scope/types";
import { getTabFromPath } from "@gately/entities/model/Scope/utils";
import { decodePortId } from "@gately/shared/infrastructure/ui-engine/lib";
import type { PinUpdate as UIPinUpdate } from "@gately/shared/infrastructure/ui-engine/model/types";
import { applyEngineEvents } from "@gately/shared/infrastructure/LogicEngine";
import { ApiLinkSingleItem_Result } from "@cnbn/engine";

type AttachOptions = {
    graph: Graph;
    client: CinabonoClient;
    getActiveScopeId: () => string | undefined;
    getScopeById: (id: string) => ScopeModel | undefined;
    applyPinUpdates?: (updates: UIPinUpdate[]) => void;
};

type EdgeData = {
    linkId?: string;
};

type PendingLink = { cancelled: boolean };

const getEdgeData = (edge: Edge): EdgeData => (edge.getData() ?? {}) as EdgeData;

const withLinkId = (edge: Edge, linkId: string) => {
    const data = getEdgeData(edge);
    edge.setData({ ...data, linkId });
};

const buildLinkFromEdge = (edge: Edge): ItemLink | null => {
    const sourceCell = edge.getSourceCell();
    const targetCell = edge.getTargetCell();
    const sourcePort = edge.getSourcePortId();
    const targetPort = edge.getTargetPortId();

    if (!sourceCell || !targetCell || !sourcePort || !targetPort) return null;
    if (!sourceCell.isNode?.() || !targetCell.isNode?.()) return null;

    const source = decodePortId(sourcePort);
    const target = decodePortId(targetPort);

    if (source.side === "right" && target.side === "left") {
        return {
            fromItemId: sourceCell.id,
            fromPin: source.id,
            toItemId: targetCell.id,
            toPin: target.id,
        };
    }

    if (source.side === "left" && target.side === "right") {
        return {
            fromItemId: targetCell.id,
            fromPin: target.id,
            toItemId: sourceCell.id,
            toPin: source.id,
        };
    }

    return null;
};

const isToggleNode = (node: Node): boolean => {
    const data = (node.getData?.() ?? {}) as { hash?: string };
    return data.hash === "TOGGLE";
};

const readBinaryValueFromClassName = (className: string): LogicValue =>
    className.split(/\s+/).includes("value-true") ? "1" : "0";

const getPrimaryOutputPin = (node: Node): { pin: string; value: LogicValue } | null => {
    const ports = node.getPorts?.() ?? [];

    for (const port of ports) {
        if (!port?.id || typeof port.id !== "string") continue;
        const { side, id } = decodePortId(port.id);
        if (side !== "right") continue;
        const className = node.getPortProp<string>(port.id, "attrs/circle/class") ?? "";
        const value = readBinaryValueFromClassName(className);
        return { pin: id, value };
    }

    return null;
};

export const attachWorkspaceBridge = (opts: AttachOptions): (() => void) => {
    const { graph, client, getActiveScopeId, getScopeById, applyPinUpdates } = opts;

    let silentDepth = 0;
    const pending = new Map<string, PendingLink>();

    const isSilent = () =>
        silentDepth > 0 || (graph as unknown as { __bridgeSilent?: boolean }).__bridgeSilent;

    const withSilent = (fn: () => void) => {
        silentDepth += 1;
        try {
            fn();
        } finally {
            silentDepth -= 1;
        }
    };

    const getActiveTabId = (): string | undefined => {
        const activeId = getActiveScopeId();
        if (!activeId) return;

        const scope = getScopeById(activeId);
        if (!scope) return activeId;

        if (scope.kind === "tab") return scope.id;
        const tabId = getTabFromPath(scope.path);
        return tabId || scope.id;
    };

    const applyItemEvents = (raw?: unknown) => {
        applyEngineEvents({ applyPinUpdates, graph }, raw);
    };

    const runToggle = async (node: Node) => {
        if (!isToggleNode(node)) return;
        if (isSilent()) return;

        const tabId = getActiveTabId();
        if (!tabId) return;

        const output = getPrimaryOutputPin(node);
        if (!output) return;

        const nextValue: LogicValue = output.value === "1" ? "0" : "1";

        try {
            const outRes = await client.call("/item/updateOutput", {
                tabId,
                itemId: node.id,
                pin: output.pin,
                value: nextValue,
            });
            applyItemEvents(outRes);
        } catch (err) {
            console.error("[workspace-bridge] toggle failed", err);
        }
    };

    const onEdgeConnected = async ({ edge }: { edge: Edge }) => {
        if (isSilent()) return;

        const tabId = getActiveTabId();
        if (!tabId) return;

        const link = buildLinkFromEdge(edge);
        if (!link) return;

        const token: PendingLink = { cancelled: false };
        pending.set(edge.id, token);

        try {
            const res = (await client.call("/item/link", {
                tabId,
                link,
            })) as ApiLinkSingleItem_Result;
            if (token.cancelled) {
                await client.call("/item/unlink", { tabId, linkId: res.linkId });
                return;
            }

            withSilent(() => {
                withLinkId(edge, res.linkId);
            });

            applyItemEvents(res);
        } catch (err) {
            console.error("[workspace-bridge] link failed", err);
            withSilent(() => {
                edge.remove();
            });
        } finally {
            pending.delete(edge.id);
        }
    };

    const onEdgeRemoved = async ({ edge }: { edge: Edge }) => {
        if (isSilent()) return;

        const tabId = getActiveTabId();
        if (!tabId) return;

        const data = getEdgeData(edge);
        const linkId = data.linkId;
        if (!linkId) {
            const p = pending.get(edge.id);
            if (p) p.cancelled = true;
            return;
        }

        try {
            const res = await client.call("/item/unlink", { tabId, linkId });
            applyItemEvents(res);
        } catch (err) {
            console.error("[workspace-bridge] unlink failed", err);
        }
    };

    const onNodeRemoved = async ({ node }: { node: Node }) => {
        if (isSilent()) return;

        const tabId = getActiveTabId();
        if (!tabId) return;

        try {
            await client.call("/item/remove", { tabId, itemId: node.id });
        } catch (err) {
            console.error("[workspace-bridge] remove item failed", err);
        }
    };

    const onNodeRemovedAny = (payload: { node?: Node; cell?: Node }) => {
        const node = payload.node ?? payload.cell;
        if (!node) return;
        void onNodeRemoved({ node });
    };

    const onNodeClick = ({ node, e }: { node: Node; e: MouseEvent }) => {
        if (!isToggleNode(node)) return;
        if ((e?.button ?? 0) !== 0) return;
        const target = e?.target as Element | null;
        if (target?.closest?.(".x6-port")) return;

        void runToggle(node);
    };

    graph.on("edge:connected", onEdgeConnected);
    graph.on("edge:removed", onEdgeRemoved);
    graph.on("node:removed", onNodeRemovedAny);
    graph.on("node:click", onNodeClick);

    return () => {
        graph.off("edge:connected", onEdgeConnected);
        graph.off("edge:removed", onEdgeRemoved);
        graph.off("node:removed", onNodeRemovedAny);
        graph.off("node:click", onNodeClick);
    };
};
