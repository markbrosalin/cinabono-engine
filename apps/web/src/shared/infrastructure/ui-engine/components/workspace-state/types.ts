import type {
    UIEngineScopePersistPatch,
    UIEngineScopeRecord,
    UIEngineTabCreateInput,
    UIEngineTabRecord,
    UIEngineTabSessionCreateInput,
    UIEngineTabSessionRecord,
} from "../../model/types";

export type WorkspaceStateApi = {
    tabs: () => UIEngineTabRecord[];
    orderedTabs: () => UIEngineTabRecord[];
    activeTabId: () => string | undefined;
    activeScopeId: () => string | undefined;
    getScope: (scopeId: string) => UIEngineScopeRecord | undefined;
    hasScope: (scopeId: string) => boolean;
    updateScope: (scopeId: string, updates: UIEngineScopePersistPatch) => void;
    addTab: (data: UIEngineTabCreateInput) => UIEngineTabRecord;
    removeTab: (tabId: string) => UIEngineTabRecord | undefined;
    setActiveScope: (scopeId: string) => void;
    setActiveTab: (tabId?: string) => void;
    getTabSession: (tabId: string) => UIEngineTabSessionRecord | undefined;
    hasTabSession: (tabId: string) => boolean;
    createTabSession: (data: UIEngineTabSessionCreateInput) => UIEngineTabSessionRecord;
    setNavigationPath: (tabId: string, navigationPath: string[]) => void;
    removeTabSession: (tabId: string) => UIEngineTabSessionRecord | undefined;
};
