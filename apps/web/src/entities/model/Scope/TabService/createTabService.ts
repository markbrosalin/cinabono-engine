import { batch, createMemo, createSignal } from "solid-js";
import { TabScopeMetadata, TabScopeModel } from "./types";
import { ScopeManager } from "../ScopeManager";
import { isTabScopeModel } from "../guards";
import { ScopeModel } from "../types";

export type TabService = ReturnType<typeof createTabService>;

export const createTabService = (scopeManager: ScopeManager) => {
    const [tabIdsOrder, setTabIdsOrder] = createSignal<string[]>([]);

    const lastTabId = createMemo(() => tabIdsOrder().at(-1));

    const orderedTabs = createMemo(() =>
        tabIdsOrder()
            .map((id) => scopeManager.getScope(id))
            .filter(isTabScopeModel),
    );

    function addTab(data: TabScopeMetadata): TabScopeModel {
        let tab!: TabScopeModel;

        batch(() => {
            tab = scopeManager.addScope({ ...data, kind: "tab" });

            setTabIdsOrder((prev = []) => [...prev, tab.id]);
        });

        if (data?.options?.setActive) scopeManager.setActiveScope(tab.id);

        return tab;
    }

    function removeTab(id: string): TabScopeModel | undefined {
        if (!tabExists(id)) return;

        let removed: ScopeModel | undefined;

        batch(() => {
            removed = scopeManager.removeScope(id);

            setTabIdsOrder((prev) => prev.filter((tabId) => tabId !== id));
        });

        return isTabScopeModel(removed) ? removed : undefined;
    }

    function tabExists(id: string): boolean {
        return isTabScopeModel(scopeManager.getScope(id));
    }

    return {
        addTab,
        orderedTabs,
        removeTab,
        lastTabId,
    };
};
