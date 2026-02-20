import type { Graph } from "@antv/x6";
import type { CinabonoClient } from "@cnbn/engine-worker";
import type { ScopeModel } from "@gately/entities/model/Scope/types";
import { resolveTabIdByActiveScope } from "@gately/entities/model/Scope/utils";
import type { WorkspaceUIEngine } from "../types";

export type AttachWorkspaceBridgeOptions = {
    graph: Graph;
    uiEngine: WorkspaceUIEngine;
    logicEngine: CinabonoClient;
    getActiveScopeId: () => string | undefined;
    getScopeById: (id: string) => ScopeModel | undefined;
    requestSimulationNow?: () => void | Promise<void>;
};

export const createBridgeRuntime = (opts: AttachWorkspaceBridgeOptions) => {
    const { graph, uiEngine, logicEngine, getActiveScopeId, getScopeById, requestSimulationNow } =
        opts;

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
        return resolveTabIdByActiveScope(getActiveScopeId(), getScopeById);
    };

    const runCommand = async <T>(_tabId: string, command: () => Promise<T>): Promise<T> => {
        const result = await command();
        if (requestSimulationNow) {
            await requestSimulationNow();
        }
        console.log("res", result);
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
