import { Accessor } from "solid-js";
import { useWorkspaceModel } from "./WorkspaceModelProvider";

export const useWorkspaceContainer = (tabId: Accessor<string | undefined>) => {
    const { store } = useWorkspaceModel();
    return () => (tabId() ? store.containersByTab[tabId()!] : undefined);
};

export const useWorkspaces = (tabId: Accessor<string | undefined>) => {
    const container = useWorkspaceContainer(tabId);
    return () => container()?.workspaces;
};

export const useActiveWorkspaceId = (tabId: Accessor<string | undefined>) => {
    const container = useWorkspaceContainer(tabId);
    return () => container()?.activeWorkspaceId;
};

export const useWorkspaceActions = () => {
    const { actions } = useWorkspaceModel();
    return actions;
};
