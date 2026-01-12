import { createTabStore, ITab, TabId } from "@gately/entities/tabs";
import { useEngine } from "@gately/app/providers/cinabono-engine";

export const createTabsService = (store: ReturnType<typeof createTabStore>) => {
    const { mutations } = store;
    const engine = useEngine();

    async function createTab(args?: Partial<ITab>) {
        const result = await engine.call("/tab/create", args);

        const newTab = mutations.createTab({ id: result.tabId });

        return newTab;
    }

    async function removeTab(tabId: TabId) {
        await engine.call("/tab/remove", { tabId });

        const removedTab = mutations.removeTab(tabId);

        return removedTab;
    }

    function openTab(tabId: TabId) {
        mutations.setActiveTab(tabId);
    }

    return {
        createTab,
        removeTab,
        updateTab: mutations.updateTab,
        getTab: mutations.getTab,
        openTab,
    };
};
