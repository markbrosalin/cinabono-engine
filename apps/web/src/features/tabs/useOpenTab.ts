import { useTabsActions } from "@gately/entities/model/tabs/hooks";

export const useOpenTab = () => {
    const actions = useTabsActions();

    const openTab = (tabId: string, conditions?: { isActive?: boolean }) => {
        if (conditions?.isActive) return;

        const tab = actions.get(tabId);
        actions.switchActive(tabId);
        return tab;
    };

    return { openTab };
};
