import { batch, createMemo, createSignal } from "solid-js";
import { TabScopeMetadata, TabScopeModel } from "./types";
import { ScopeManager } from "../ScopeManager";
import { isTabScopeModel } from "../guards";

export type TabService = ReturnType<typeof createTabService>;

export const createTabService = (scopeManager: ScopeManager) => {
    const [tabIdsOrder, setTabIdsOrder] = createSignal<string[]>([]);

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
        if (!tabExists) return;

        const removed = scopeManager.removeScope(id);

        if (isTabScopeModel(removed)) return removed;

        return undefined;
    }

    function tabExists(id: string): boolean {
        return isTabScopeModel(scopeManager.getScope(id));
    }

    return {
        addTab,
        orderedTabs,
        removeTab,
    };
};
