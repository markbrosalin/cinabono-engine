import type {
    UIEngineTabCloseConditions,
    UIEngineTabCreateInput,
} from "../../../../model/types";

export type WorkspaceTabService = {
    createTab: (data?: UIEngineTabCreateInput) => Promise<{ tabId: string }>;
    canCloseTab: (tabId: string, conditions?: UIEngineTabCloseConditions) => boolean;
    closeTab: (tabId: string, conditions?: UIEngineTabCloseConditions) => Promise<boolean>;
};
