import { useScopeContext } from "@gately/entities/model/Scope/ScopeProvider";
import { TabScopeMetadata } from "@gately/entities/model/Scope/TabService";
import { useLogicEngine } from "@gately/shared/infrastructure/LogicEngine";

export const useOpenNewTab = () => {
    const logicEngine = useLogicEngine();
    const scopeCtx = useScopeContext();

    async function openNewTab(data: TabScopeMetadata = {}) {
        const { tabId } = await logicEngine.call("/tab/create", {});

        const tab = scopeCtx.addTab({
            id: tabId,
            childrenIds: data.childrenIds,
            name: data.name,
            contentJson: data.contentJson,
            options: { setActive: true },
        });

        return tab;
    }

    function openTab(tabId: string) {
        scopeCtx.setActiveScope(tabId);
    }

    return { openNewTab, openTab };
};
