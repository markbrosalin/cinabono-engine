import { useTabsActions } from "@gately/entities/model/tabss/hooks";

export const useOpenTab = () => {
    const tabActions = useTabsActions();

    const openTab = (tabId: string, conditions?: { isActive?: boolean }) => {
        if (conditions?.isActive === true) return;
        tabActions.switchActive(tabId);
    };

    return { openTab };
};
