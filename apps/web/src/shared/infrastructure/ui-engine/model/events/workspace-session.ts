export const WORKSPACE_SESSION_TAB_CREATED_EVENT = "workspace-session:tab-created";
export const WORKSPACE_SESSION_TAB_OPENED_EVENT = "workspace-session:tab-opened";
export const WORKSPACE_SESSION_TAB_CLOSED_EVENT = "workspace-session:tab-closed";
export const WORKSPACE_SESSION_NAVIGATION_CHANGED_EVENT = "workspace-session:navigation-changed";

export type WorkspaceSessionTabCreatedEvent = {
    tabId: string;
    rootScopeId: string;
};

export type WorkspaceSessionTabOpenedEvent = {
    tabId: string;
    activeScopeId: string;
    navigationPath: string[];
};

export type WorkspaceSessionTabClosedEvent = {
    tabId: string;
    nextActiveTabId?: string;
};

export type WorkspaceSessionNavigationChangedEvent = {
    tabId: string;
    activeScopeId: string;
    navigationPath: string[];
};
