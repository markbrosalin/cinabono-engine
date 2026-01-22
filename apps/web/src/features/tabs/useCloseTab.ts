import { useScopeContext } from "@gately/entities/model/Scope/ScopeProvider";
import { useLogicEngine } from "@gately/shared/infrastructure/LogicEngine";
import { useOpenNewTab } from "./useOpenTab";

export const useCloseTab = () => {
    const logicEngine = useLogicEngine();
    const scopeCtx = useScopeContext();
    const { openTab } = useOpenNewTab();

    const closeTab = async (tabId: string, conditions?: { isEditing?: boolean }) => {
        if (!canCloseTab(tabId, conditions)) {
            throw new Error(`[useCloseTab.canCloseTab]: Couldn't remove tab ${tabId}.`);
        }

        const tabs = scopeCtx.orderedTabs();
        const activeId = scopeCtx.activeScopeId();
        const nextActiveId = (() => {
            if (activeId !== tabId) return activeId;

            const idx = tabs.findIndex((tab) => tab.id === tabId);
            if (idx === -1) return activeId;

            return tabs[idx - 1]?.id ?? tabs[idx + 1]?.id;
        })();

        const result = await logicEngine.call("/tab/remove", { tabId });

        if (!result.isTabRemoved) console.error(`Logic engine couldn't remove tab: ${tabId}`);

        const removed = scopeCtx.removeTab(tabId);

        if (nextActiveId) openTab(nextActiveId);

        return removed;
    };

    function canCloseTab(tabId: string, conditions?: { isEditing?: boolean }): boolean {
        // can't remove last tab
        if (scopeCtx.orderedTabs().length <= 1) return false;

        // can't remove unknown tab
        if (!scopeCtx.hasScope(tabId)) return false;

        // can't remove tab while editing
        if (conditions?.isEditing) return false;
        return true;
    }

    return { closeTab, canCloseTab };
};
