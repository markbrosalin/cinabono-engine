import { useWorkspaceModel } from "./WorkspaceModelProvider";

export const useTabWorkspaces = (tabId: string) => {
    const { store } = useWorkspaceModel();
    return store.containersByTab[tabId]?.workspaces ?? {};
};

export const useActiveTabWorkspace = (tabId: string) => {
    const { store } = useWorkspaceModel();
    return store.containersByTab[tabId]?.activeWorkspace ?? {};
};

export const useWorkspaceActions = () => {
    const { actions } = useWorkspaceModel();
    return actions;
};
