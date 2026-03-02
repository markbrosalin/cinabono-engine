export type WorkspaceNavigationService = {
    openTab: (tabId?: string) => void;
    openScope: (scopeId: string, tabId?: string) => void;
};
