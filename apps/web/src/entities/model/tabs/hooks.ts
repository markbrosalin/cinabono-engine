import { useTabsModel } from "./TabsModelProvider";

export const useTabs = () => {
    const { store } = useTabsModel();
    return () => store.tabs;
};

export const useActiveTabId = () => {
    const { store } = useTabsModel();
    return () => store.activeTabId;
};

export const useTabsActions = () => {
    const { actions } = useTabsModel();
    return actions;
};
