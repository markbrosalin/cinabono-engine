import { useScopeContext } from "@gately/entities/model/Scope/ScopeProvider";
import { useLogicEngine } from "@gately/shared/infrastructure/LogicEngine";

export const useCloseTab = () => {
    const logicEngine = useLogicEngine();
    const scopeCtx = useScopeContext();

    const closeTab = async (tabId: string, conditions?: { isEditing?: boolean }) => {
        // if (!canCloseTab(tabId, conditions)) {
        //     throw new Error(`Cannot remove tab ${tabId}.`);
        // }
        // const result = await logicEngine.call("/tab/remove", { tabId });
        // if (!result.isTabRemoved) console.error(`Engine couldn't remove tab: ${tabId}`);
        // const removedTab = scopeCtx.manager.RemoveTab(tabId);
        // return removedTab;
    };

    function canCloseTab(tabId: string, conditions?: { isEditing?: boolean }): boolean {
        // // can't remove last tab
        // if (scopeCtx.tabsCount() <= 1) return false;
        // // can't remove unknown tab
        // if (!scopeCtx.manager.Has(tabId)) return false;
        // // can't remove tab while editing
        // if (conditions?.isEditing) return false;
        // return true;
    }

    return { closeTab, canCloseTab };
};
