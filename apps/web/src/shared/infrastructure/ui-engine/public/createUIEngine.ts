import { createEffect, createSignal } from "solid-js";
import type { ItemBuilderResult } from "@cnbn/engine";
import { createGraphRuntime } from "../components/graph-runtime";
import { createWorkspaceState } from "../components/workspace-state";
import { createWorkspaceSession } from "../components/workspace-session";
import { getNodeKindByHash } from "../model";
import type { UIEngineContext, UIEngineExternalContext } from "../model/types";
import type { UIEngineInstance, UIEnginePublicApi } from "./types";

export const createUIEngine = (
    externalCtx: UIEngineExternalContext = {},
): UIEngineInstance => {
    const engineCtx: UIEngineContext = { ...externalCtx } as UIEngineContext;
    const [container, setContainer] = createSignal<HTMLDivElement | undefined>(undefined);
    const [graphRuntime, setGraphRuntime] = createSignal<ReturnType<typeof createGraphRuntime> | null>(
        null,
    );
    const workspaceState = createWorkspaceState();
    let attachedContainer: HTMLDivElement | undefined;

    const getRequiredLogicEngine = () => {
        const logicEngine = engineCtx.logicEngine;
        if (!logicEngine) {
            throw new Error("[UIEngine] logic engine is not configured");
        }
        return logicEngine;
    };

    const getRequiredGraphRuntime = () => {
        const runtime = graphRuntime();
        if (!runtime) {
            throw new Error("[UIEngine] graph runtime is not attached");
        }
        return runtime;
    };

    const workspaceComponent = engineCtx.logicEngine
        ? createWorkspaceSession({
              logicEngine: engineCtx.logicEngine,
              workspace: workspaceState,
              getRuntimeSnapshotApi: () => {
                  const runtime = graphRuntime();
                  if (!runtime) return;

                  return {
                      exportScopeSnapshot: runtime.exportScopeSnapshot,
                      importScopeSnapshot: runtime.importScopeSnapshot,
                  };
              },
          })
        : undefined;

    createEffect(() => {
        const nextContainer = container();
        if (attachedContainer === nextContainer) return;

        const current = graphRuntime();
        if (current) {
            current.dispose();
            setGraphRuntime(null);
        }

        attachedContainer = nextContainer;
        if (!nextContainer) return;

        const nextRuntime = createGraphRuntime(nextContainer, engineCtx);
        setGraphRuntime(nextRuntime);
        workspaceComponent?.syncRuntimeSnapshot();
    });

    const commands: UIEnginePublicApi["commands"] = {
        createTab(input) {
            const workspace = workspaceComponent;
            if (!workspace) {
                throw new Error("[UIEngine] workspace session is not configured");
            }

            return workspace.createTab(input);
        },
        openTab(tabId) {
            const workspace = workspaceComponent;
            if (!workspace) {
                throw new Error("[UIEngine] workspace session is not configured");
            }

            workspace.openTab(tabId);
        },
        canCloseTab(tabId, conditions) {
            const workspace = workspaceComponent;
            if (!workspace) return false;

            return workspace.canCloseTab(tabId, conditions);
        },
        closeTab(tabId, conditions) {
            const workspace = workspaceComponent;
            if (!workspace) {
                throw new Error("[UIEngine] workspace session is not configured");
            }

            return workspace.closeTab(tabId, conditions);
        },
        async addNode(input) {
            const logicEngine = getRequiredLogicEngine();
            const runtime = getRequiredGraphRuntime();
            const activeScopeId = workspaceState.activeScopeId();
            if (!activeScopeId) return;

            const activeScope = workspaceState.getScope(activeScopeId);
            if (!activeScope) return;

            const result = (await logicEngine.call("/item/create", {
                kind: getNodeKindByHash(input.hash),
                hash: input.hash,
                path: [...activeScope.path, activeScope.id],
            })) as ItemBuilderResult;

            return runtime.createBuiltNode(result);
        },
        exportScopeSnapshot() {
            return getRequiredGraphRuntime().exportScopeSnapshot();
        },
        importScopeSnapshot(snapshot) {
            getRequiredGraphRuntime().importScopeSnapshot(snapshot);
        },
        applyPinPatch(patch) {
            getRequiredGraphRuntime().applyPinPatch(patch);
        },
        applySignalEvents(events) {
            getRequiredGraphRuntime().applySignalEvents(events);
        },
    };

    const dispose = () => {
        const runtime = graphRuntime();
        if (!runtime) return;

        runtime.dispose();
        attachedContainer = undefined;
        setGraphRuntime(null);
    };

    return {
        mount: {
            setContainer,
        },
        state: {
            ready: () => Boolean(graphRuntime()),
            selectionCount: () => graphRuntime()?.getSelectionCount() ?? 0,
            tabs: workspaceState.tabs,
            activeTabId: workspaceState.activeTabId,
            activeScopeId: workspaceState.activeScopeId,
            getScopeById: workspaceState.getScope,
        },
        commands,
        debug: {
            graph: () => graphRuntime()?.graph(),
        },
        dispose,
    };
};
