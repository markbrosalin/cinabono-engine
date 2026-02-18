import type { Edge, Graph, Node } from "@antv/x6";
import { ApiLinkSingleItem_Result } from "@cnbn/engine";
import type { CinabonoClient } from "@cnbn/engine-worker";
import type { ItemLink } from "@cnbn/schema";
import type { ScopeModel } from "@gately/entities/model/Scope/types";
import { getTabFromPath } from "@gately/entities/model/Scope/utils";
import { decodePortId, hasIncomingOnPort } from "@gately/shared/infrastructure/ui-engine/lib";
import { resolvePrimaryNodeClickHandler } from "./node-interactions";
import type { WorkspaceUIEngine } from "./types";

type AttachOptions = {
    graph: Graph;
    uiEngine: WorkspaceUIEngine;
    logicEngine: CinabonoClient;
    getActiveScopeId: () => string | undefined;
    getScopeById: (id: string) => ScopeModel | undefined;
};

type EdgeData = {
    linkId?: string;
};

type PendingLink = {
    cancelled: boolean;
};

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

const applyInputHighZAfterUnlink = (graph: Graph, uiEngine: WorkspaceUIEngine, edge: Edge) => {
    const targetCell = edge.getTargetCell();
    const targetPort = edge.getTargetPortId();

    console.log(hasIncomingOnPort(graph, targetCell, targetPort, edge.id));
    if (hasIncomingOnPort(graph, targetCell, targetPort, edge.id)) return;

    const target = decodePortId(targetPort);
    if (target.side !== "left") return;
    console.log("here");
    uiEngine.services()?.ports?.applyPinUpdate({
        elementId: targetCell.id,
        pinRef: {
            side: "input",
            index: target.id,
        },
        value: "Z",
    });
};

export const attachWorkspaceBridge = (opts: AttachOptions): (() => void) => {
    const { graph, logicEngine, uiEngine, getActiveScopeId, getScopeById } = opts;

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

    const runSchedule = async (tabId: string) => {
        await logicEngine.call("/simulation/simulate", {
            tabId,
            runCfg: { maxBatchTicks: 1 },
        });
    };

    const runCommand = async <T>(tabId: string, command: () => Promise<T>): Promise<T> => {
        const result = await command();
        await runSchedule(tabId);
        return result;
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
            const res = (await runCommand(tabId, () =>
                logicEngine.call("/item/link", { tabId, link }),
            )) as ApiLinkSingleItem_Result;

            if (token.cancelled) {
                await runCommand(tabId, () =>
                    logicEngine.call("/item/unlink", { tabId, linkId: res.linkId }),
                );
                return;
            }

            withSilent(() => {
                withLinkId(edge, res.linkId);
            });
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

        applyInputHighZAfterUnlink(graph, uiEngine, edge);

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
            await runCommand(tabId, () => logicEngine.call("/item/unlink", { tabId, linkId }));
        } catch (err) {
            console.error("[workspace-bridge] unlink failed", err);
        }
    };

    const onNodeRemoved = async ({ node }: { node: Node }) => {
        if (isSilent()) return;

        const tabId = getActiveTabId();
        if (!tabId) return;

        try {
            await runCommand(tabId, () =>
                logicEngine.call("/item/remove", { tabId, itemId: node.id }),
            );
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
        if (isSilent()) return;
        if ((e?.button ?? 0) !== 0) return;

        const handler = resolvePrimaryNodeClickHandler(node);
        if (!handler) return;

        const target = e?.target as Element | null;
        if (target?.closest?.(".x6-port")) return;

        const tabId = getActiveTabId();
        if (!tabId) return;

        void handler({
            node,
            tabId,
            uiEngine,
            logicEngine,
            runCommand: <T>(command: () => Promise<T>) => runCommand(tabId, command),
        });
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
