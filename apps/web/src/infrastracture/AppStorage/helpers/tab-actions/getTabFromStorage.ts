import { AppStorage } from "../../storage";

const [tabs] = AppStorage.HIERARCHY.data;

export const hasTabInAppStorage = (tabId: string) => (getTab(tabId) ? true : false);

export const getTab = (tabId: string) => {
    return tabs.find((tab) => tab.tabId === tabId);
};

export const getTabIndex = (tabId: string | undefined) => {
    return tabs.findIndex((tab) => tab.tabId === tabId);
};
