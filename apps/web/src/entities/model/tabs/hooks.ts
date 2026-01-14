import { useTabsModel } from "./TabsModelProvider";

export const useTabs = () => {
    const { store } = useTabsModel();
    return store.tabs;
};

export const useActiveTab = () => {
    const { store } = useTabsModel();
    return store.activeTab;
};

export const useTabsActions = () => {
    const { actions } = useTabsModel();
    return actions;
};
