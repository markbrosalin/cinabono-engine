import { useEngine } from "@gately/app/providers/EngineProvider";
import { useTabs, useTabsActions } from "@gately/entities/model/tabs/hooks";

export const useCloseTab = () => {
    const actions = useTabsActions();
    const engine = useEngine();
    const tabs = useTabs();

    const closeTab = async (tabId: string, conditions?: { isEditing?: boolean }) => {
        if (!canCloseTab(tabId, conditions)) {
            throw new Error(`Cannot remove tab ${tabId}.`);
        }

        const result = await engine.call("/tab/remove", { tabId });
        if (!result.isTabRemoved) console.error(`Engine couldn't remove tab: ${tabId}`);

        const removedTab = actions.remove(tabId);

        return removedTab;
    };

    function canCloseTab(tabId: string, conditions?: { isEditing?: boolean }): boolean {
        // can't remove last tab
        if (tabs.length <= 1) return false;

        // can't remove unknown tab
        if (!tabs.some((t) => t.id === tabId)) return false;

        // can't remove tab while editing
        if (conditions?.isEditing) return false;

        return true;
    }

    return { closeTab, canCloseTab };
};
