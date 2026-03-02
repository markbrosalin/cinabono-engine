import type {
    UIEngineScopePersistPatch,
    UIEngineScope,
    UIEngineTabCreateInput,
    UIEngineTab,
    UIEngineTabSessionCreateInput,
    UIEngineTabSession,
} from "../../../../model/types";

export type WorkspaceStateService = {
    tabs: () => UIEngineTab[];
    orderedTabs: () => UIEngineTab[];
    activeTabId: () => string | undefined;
    activeScopeId: () => string | undefined;
    getScope: (scopeId: string) => UIEngineScope | undefined;
    getScopeChildren: (scopeId: string) => UIEngineScope[];
    getNavigationPath: (tabId: string) => string[];
    getNavigationScopes: (tabId: string) => UIEngineScope[];
    hasScope: (scopeId: string) => boolean;
    upsertScope: (scope: UIEngineScope) => UIEngineScope;
    attachChildScope: (parentScopeId: string, childScopeId: string) => void;
    updateScope: (scopeId: string, updates: UIEngineScopePersistPatch) => void;
    addTab: (data: UIEngineTabCreateInput) => UIEngineTab;
    removeTab: (tabId: string) => UIEngineTab | undefined;
    setActiveScope: (scopeId: string) => void;
    setActiveTab: (tabId?: string) => void;
    getTabSession: (tabId: string) => UIEngineTabSession | undefined;
    hasTabSession: (tabId: string) => boolean;
    createTabSession: (data: UIEngineTabSessionCreateInput) => UIEngineTabSession;
    setNavigationPath: (tabId: string, navigationPath: string[]) => void;
    removeTabSession: (tabId: string) => UIEngineTabSession | undefined;
};
