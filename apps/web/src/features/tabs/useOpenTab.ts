import { TabScopeMetadata } from "@gately/entities/model/Scope/TabService";
import { useUIEngine } from "@gately/shared/infrastructure";

export const useOpenNewTab = () => {
    const uiEngine = useUIEngine();

    const openNewTab = (data: TabScopeMetadata = {}) => uiEngine.commands.createTab(data);
    const openTab = (tabId?: string) => uiEngine.commands.openTab(tabId);

    return { openNewTab, openTab };
};
