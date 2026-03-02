import type {
    UIEngineComponentDeps,
    UIEngineScope,
    UIEngineTabCloseConditions,
    UIEngineTabCreateInput,
    UIEngineTab,
} from "../../model/types";
import type { WorkspaceStateService } from "./services/state";

export type WorkspaceSessionExternal = {};

export type WorkspaceSessionDeps = UIEngineComponentDeps<WorkspaceSessionExternal>;

export type WorkspaceSessionCreateTabInput = UIEngineTabCreateInput;
export type WorkspaceSessionCloseTabConditions = UIEngineTabCloseConditions;
export type WorkspaceSessionStateApi = Pick<
    WorkspaceStateService,
    | "tabs"
    | "orderedTabs"
    | "activeTabId"
    | "activeScopeId"
    | "getScope"
    | "getScopeChildren"
    | "getNavigationPath"
    | "getNavigationScopes"
> & {
    tabs: () => UIEngineTab[];
    orderedTabs: () => UIEngineTab[];
    getScope: (scopeId: string) => UIEngineScope | undefined;
    getScopeChildren: (scopeId: string) => UIEngineScope[];
    getNavigationScopes: (tabId: string) => UIEngineScope[];
};

export type WorkspaceSessionApi = {
    state: WorkspaceSessionStateApi;
    createTab: (data?: WorkspaceSessionCreateTabInput) => Promise<{ tabId: string }>;
    openTab: (tabId?: string) => void;
    openScope: (scopeId: string, tabId?: string) => void;
    canCloseTab: (tabId: string, conditions?: WorkspaceSessionCloseTabConditions) => boolean;
    closeTab: (tabId: string, conditions?: WorkspaceSessionCloseTabConditions) => Promise<boolean>;
    syncRuntimeSnapshot: () => void;
};
