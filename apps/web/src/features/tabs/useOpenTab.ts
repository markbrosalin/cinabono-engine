import { useScopeContext } from "@gately/entities/model/Scope/ScopeProvider";
import { TabScopeMetadata } from "@gately/entities/model/Scope/TabService";
import { useLogicEngine } from "@gately/shared/infrastructure/LogicEngine";
import { useUIEngine } from "@gately/shared/infrastructure";

export const useOpenNewTab = () => {
    const logicEngine = useLogicEngine();
    const scopeCtx = useScopeContext();
    const uiEngine = useUIEngine();

    async function openNewTab(data: TabScopeMetadata = {}) {
        const { tabId } = await logicEngine.call("/tab/create", {});

        const tab = scopeCtx.addTab({
            id: tabId,
            childrenIds: data.childrenIds,
            name: data.name ?? "New Tab",
            contentJson: data.contentJson ?? "",
            viewport: data.viewport ?? { zoom: 1, tx: 0, ty: 0 },
            options: { setActive: false },
        });

        const shouldSetActive = data.options?.setActive ?? true;
        if (shouldSetActive) openTab(tab.id);

        return tab;
    }

    function openTab(tabId?: string): void {
        if (!tabId) return;
        if (!scopeCtx.hasScope(tabId)) return;

        const currentId = scopeCtx.activeScopeId();
        if (currentId && currentId !== tabId) {
            const snapshot = uiEngine.exportScopeSnapshot();
            if (snapshot) {
                scopeCtx.updateScope(currentId, {
                    contentJson: snapshot.contentJson,
                    viewport: snapshot.viewport,
                    _updatedAt: Date.now(),
                });
            }
        }

        if (currentId === tabId) return;

        scopeCtx.setActiveScope(tabId);
        const nextScope = scopeCtx.getScope(tabId);
        uiEngine.importScopeSnapshot({
            contentJson: nextScope?.contentJson ?? "",
            viewport: nextScope?.viewport ?? { zoom: 1, tx: 0, ty: 0 },
        });
    }

    return { openNewTab, openTab };
};
