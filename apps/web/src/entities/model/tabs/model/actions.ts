import { SetStoreFunction, produce } from "solid-js/store";
import { ITabStore, ITab } from "../types";
import { getIndexById, removeItemById } from "@gately/shared/lib/array";
import { PartialExceptId } from "@gately/shared/types";
import { batch } from "solid-js";

export type TabsActions = ReturnType<typeof createTabsActions>;

export const createTabsActions = (store: ITabStore, setStore: SetStoreFunction<ITabStore>) => {
    function create(
        tabId: string,
        options?: {
            data?: PartialExceptId<ITab>;
            switchActive?: boolean;
        }
    ): ITab {
        const newTab: ITab = {
            id: tabId,
            title: options?.data?.title ?? "New Tab",
        };

        batch(() => {
            setStore(produce((store) => store.tabs.push(newTab)));

            if (options?.switchActive === true) {
                setStore("activeTab", newTab);
            }
        });

        return newTab;
    }

    function remove(tabId: string): ITab | undefined {
        let removedTab: ITab | undefined;

        setStore(
            produce(({ tabs }) => {
                removedTab = removeItemById(tabs, tabId);
            })
        );

        return removedTab;
    }

    function update(tabId: string, data: PartialExceptId<ITab>): ITab | undefined {
        const index = getIndexById(store.tabs, tabId);
        if (!index) return;

        setStore("tabs", index, data);

        return store.tabs[index];
    }

    function get(tabId: string): ITab | undefined {
        return store.tabs.find((tab) => tab.id === tabId);
    }

    function has(tabId: string): boolean {
        return get(tabId) ? true : false;
    }

    function switchActive(tabId: string): boolean {
        const tab = get(tabId);
        if (!tab) return false;

        if (store.activeTab?.id === tabId) return true;

        setStore("activeTab", tab);
        return true;
    }

    return { create, remove, update, get, has, switchActive };
};
