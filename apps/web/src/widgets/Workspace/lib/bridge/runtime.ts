import type { Graph } from "@antv/x6";
import type { CinabonoClient } from "@cnbn/engine-worker";
import type { ScopeModel } from "@gately/entities/model/Scope/types";
import { getTabFromPath } from "@gately/entities/model/Scope/utils";
import type { WorkspaceUIEngine } from "../types";

export type AttachWorkspaceBridgeOptions = {
    graph: Graph;
    uiEngine: WorkspaceUIEngine;
    logicEngine: CinabonoClient;
    getActiveScopeId: () => string | undefined;
    getScopeById: (id: string) => ScopeModel | undefined;
};

export const createBridgeRuntime = (opts: AttachWorkspaceBridgeOptions) => {
    const { graph, uiEngine, logicEngine, getActiveScopeId, getScopeById } = opts;

    let silentDepth = 0;
    const pendingLinks = new Map<string, { cancelled: boolean }>();

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

    return {
        graph,
        uiEngine,
        logicEngine,
        pendingLinks,
        isSilent,
        withSilent,
        getActiveTabId,
        runCommand,
    };
};

export type BridgeRuntime = ReturnType<typeof createBridgeRuntime>;

