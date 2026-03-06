import { createUninitializedGetter } from "../../lib/registry";
import { buildWorkspaceServices } from "./services";
import type { WorkspaceApi, WorkspaceDeps, WorkspaceStateApi } from "./types";

export const createWorkspace = (deps: WorkspaceDeps): WorkspaceApi => {
    const services = buildWorkspaceServices({
        ...deps,
        getService: createUninitializedGetter("Workspace"),
    });

    const state: WorkspaceStateApi = {
        tabs: services.state.tabs,
        orderedTabs: services.state.orderedTabs,
        activeTabId: services.state.activeTabId,
        activeScopeId: services.state.activeScopeId,
        getScope: services.state.getScope,
        getScopeChildren: services.state.getScopeChildren,
        getNavigationPath: services.state.getNavigationPath,
        getNavigationScopes: services.state.getNavigationScopes,
    };

    return {
        state,
        createTab: services.tab.createTab,
        openTab: services.navigation.openTab,
        openScope: services.navigation.openScope,
        canCloseTab: services.tab.canCloseTab,
        closeTab: services.tab.closeTab,
        syncRuntimeSnapshot: services.snapshot.syncRuntimeSnapshot,
    };
};

