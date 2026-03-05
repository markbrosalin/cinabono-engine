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
    createTab: (data?: UIEngineTabCreateInput) => Promise<{ tabId: string }>;
    openTab: (tabId?: string) => void;
    openScope: (scopeId: string, tabId?: string) => void;
    canCloseTab: (tabId: string, conditions?: UIEngineTabCloseConditions) => boolean;
    closeTab: (tabId: string, conditions?: UIEngineTabCloseConditions) => Promise<boolean>;
    syncRuntimeSnapshot: () => void;
};
