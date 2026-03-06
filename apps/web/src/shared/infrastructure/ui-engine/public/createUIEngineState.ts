import type { createGraphRuntimeHost } from "../components/graph-runtime";
import type { createWorkspace } from "../components/workspace";
import type { UIEnginePublicApi } from "./types";

type CreateUIEngineStateDeps = {
    workspace: ReturnType<typeof createWorkspace>;
    graphRuntimeHost: ReturnType<typeof createGraphRuntimeHost>;
};

export const createUIEngineState = ({
    workspace,
    graphRuntimeHost,
}: CreateUIEngineStateDeps): UIEnginePublicApi["state"] => {
    return {
        ready: () => Boolean(graphRuntimeHost.runtime()),
        selectionCount: graphRuntimeHost.selectionCount,
        tabs: workspace.state.tabs,
        activeTabId: workspace.state.activeTabId,
        activeScopeId: workspace.state.activeScopeId,
        getScopeById: workspace.state.getScope,
        getScopeChildrenById: workspace.state.getScopeChildren,
        getNavigationPathByTabId: workspace.state.getNavigationPath,
        getNavigationScopesByTabId: workspace.state.getNavigationScopes,
        activeNavigationPath: () => {
            const activeTabId = workspace.state.activeTabId();
            return activeTabId ? workspace.state.getNavigationPath(activeTabId) : [];
        },
        activeNavigationScopes: () => {
            const activeTabId = workspace.state.activeTabId();
            return activeTabId ? workspace.state.getNavigationScopes(activeTabId) : [];
        },
    };
};

