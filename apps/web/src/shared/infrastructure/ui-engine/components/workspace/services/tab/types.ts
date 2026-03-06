import type {
    UIEngineTabCloseConditions,
    UIEngineTabCreateInput,
} from "@gately/shared/infrastructure/ui-engine/model/types";

export type WorkspaceTabService = {
    createTab: (data?: UIEngineTabCreateInput) => Promise<{ tabId: string }>;
    canCloseTab: (tabId: string, conditions?: UIEngineTabCloseConditions) => boolean;
    closeTab: (tabId: string, conditions?: UIEngineTabCloseConditions) => Promise<boolean>;
};
