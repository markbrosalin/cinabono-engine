import { createUninitializedGetter } from "../../lib/registry/types";
import {
    buildWorkspaceServices,
} from "./services";
import type {
    WorkspaceSessionApi,
    WorkspaceSessionDeps,
    WorkspaceSessionStateApi,
} from "./types";

export const createWorkspaceSession = (deps: WorkspaceSessionDeps): WorkspaceSessionApi => {
    const services = buildWorkspaceServices({
        ...deps,
        getService: createUninitializedGetter(
            "[UIEngine] workspace service getter is not initialized",
        ),
    });
    const state: WorkspaceSessionStateApi = {
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
