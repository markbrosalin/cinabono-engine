// import { useTabsActions } from "@gately/entities/model/tabss/hooks";

export const useUpdateTabTitle = () => {
    // const actions = useTabsActions();

    const updateTabTitle = (tabId: string, title: string) => {
        const updated = actions.update(tabId, { title });
        return updated;
    };

    return { updateTabTitle };
};
