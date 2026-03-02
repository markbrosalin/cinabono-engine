import { createEffect, createSignal } from "solid-js";
import type { ItemBuilderResult } from "@cnbn/engine";
import { createGraphRuntime } from "../components/graph-runtime";
import { createWorkspaceSession } from "../components/workspace-session";
import { createUninitializedGetter } from "../lib/registry/types";
import { getNodeKindByHash } from "../model";
import { buildSharedServices } from "../shared-services";
import type { UIEngineContext, UIEngineExternalContext } from "../model/types";
import type { UIEngineInstance, UIEnginePublicApi } from "./types";

export const createUIEngine = (
    externalCtx: UIEngineExternalContext = {},
): UIEngineInstance => {
    const { getService: getSharedService } = buildSharedServices(externalCtx.hooks?.onLifecycle);
    const engineCtx: UIEngineContext = {
        external: externalCtx,
        getSharedService,
        getService: createUninitializedGetter("[UIEngine] graph service getter is not initialized"),
    };
    const [container, setContainer] = createSignal<HTMLDivElement | undefined>(undefined);
    const [graphRuntime, setGraphRuntime] = createSignal<ReturnType<typeof createGraphRuntime> | null>(
        null,
    );
    let attachedContainer: HTMLDivElement | undefined;

    const getRequiredLogicEngine = () => {
        const logicEngine = engineCtx.external.logicEngine;
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

    const workspaceComponent = createWorkspaceSession({
        getSharedService,
        external: {
            ...engineCtx.external,
            getRuntimeSnapshotApi: () => {
                const runtime = graphRuntime();
                if (!runtime) return;

                return {
                    exportScopeSnapshot: runtime.exportScopeSnapshot,
                    importScopeSnapshot: runtime.importScopeSnapshot,
                };
            },
        },
    });

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
        workspaceComponent.syncRuntimeSnapshot();
    });

    const commands: UIEnginePublicApi["commands"] = {
        createTab(input) {
            return workspaceComponent.createTab(input);
        },
        openTab(tabId) {
            workspaceComponent.openTab(tabId);
        },
        openScope(scopeId, tabId) {
            workspaceComponent.openScope(scopeId, tabId);
        },
        canCloseTab(tabId, conditions) {
            return workspaceComponent.canCloseTab(tabId, conditions);
        },
        closeTab(tabId, conditions) {
            return workspaceComponent.closeTab(tabId, conditions);
        },
        async addNode(input) {
            const logicEngine = getRequiredLogicEngine();
            const runtime = getRequiredGraphRuntime();
            const activeScopeId = workspaceComponent.state.activeScopeId();
            if (!activeScopeId) return;

            const activeScope = workspaceComponent.state.getScope(activeScopeId);
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
            tabs: workspaceComponent.state.tabs,
            activeTabId: workspaceComponent.state.activeTabId,
            activeScopeId: workspaceComponent.state.activeScopeId,
            getScopeById: workspaceComponent.state.getScope,
            getScopeChildrenById: workspaceComponent.state.getScopeChildren,
            getNavigationPathByTabId: workspaceComponent.state.getNavigationPath,
            getNavigationScopesByTabId: workspaceComponent.state.getNavigationScopes,
            activeNavigationPath: () => {
                const activeTabId = workspaceComponent.state.activeTabId();
                return activeTabId ? workspaceComponent.state.getNavigationPath(activeTabId) : [];
            },
            activeNavigationScopes: () => {
                const activeTabId = workspaceComponent.state.activeTabId();
                return activeTabId ? workspaceComponent.state.getNavigationScopes(activeTabId) : [];
            },
        },
        commands,
        debug: {
            graph: () => graphRuntime()?.graph(),
        },
        dispose,
    };
};
