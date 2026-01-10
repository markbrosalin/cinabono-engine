import { AppStorage } from "../../storage";

const [tabs, setTabs] = AppStorage.HIERARCHY.data;
const [ActiveTabId, SetActiveTabId] = AppStorage.TAB_SETTINGS.data.ActiveTabId;

export const removeTabFromAppStorage = (tabId: string) => {
    selectNextActiveTab(tabId);

    setTabs((prevTabs) => prevTabs.filter((tab) => tab.tabId !== tabId));
};

function selectNextActiveTab(tabId: string) {
    const tabIndex = tabs.findIndex((tab) => tab.tabId === tabId);

    if (ActiveTabId() === tabId) {
        const rightNeighbour = tabs[tabIndex + 1];
        const leftNeighbour = tabs[tabIndex - 1];

        const nextTabId = rightNeighbour?.tabId ?? leftNeighbour?.tabId;

        if (nextTabId) SetActiveTabId(nextTabId ?? "");
    }
}
