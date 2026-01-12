import { PartialExcept } from "@cnbn/schema";
import { spliceAt, uniqueId } from "@cnbn/utils";
import { SetStoreFunction, produce } from "solid-js/store";
import { TabStoreState, ITab, TabId } from "./types";

export type TabService = ReturnType<typeof tabStoreMutations>;

export const tabStoreMutations = (
    state: TabStoreState,
    setState: SetStoreFunction<TabStoreState>
) => {
    function createTab(args?: Partial<ITab>): ITab {
        const newTab = {
            id: args?.id ?? uniqueId(),
            title: args?.title ?? "New Tab",
        };

        setState(produce((store) => store.tabs.push(newTab)));

        return newTab;
    }

    function removeTab(tabId: TabId): ITab | undefined {
        let removedTab: ITab | undefined;

        setState(
            produce(({ tabs }) => {
                const index = tabs.findIndex((tab) => tab.id === tabId);
                if (index === -1) return;

                removedTab = tabs[index];
                spliceAt(tabs, index);
            })
        );

        return removedTab;
    }

    function updateTab(args: PartialExcept<ITab, "id">): ITab | undefined {
        let updatedTab: ITab | undefined;

        setState(
            produce(({ tabs }) => {
                const index = tabs.findIndex((tab) => tab.id === args.id);
                if (index === -1) return;

                updatedTab = {
                    ...tabs[index],
                    ...args,
                };

                tabs[index] = updatedTab;
            })
        );

        return updatedTab;
    }

    function getTab(tabId: TabId): ITab | undefined {
        return state.tabs.find((tab) => tab.id === tabId);
    }

    function setActiveTab(tabId: TabId): void {
        setState(
            produce((state) => {
                const tab = getTab(tabId);
                if (!tab) return;

                state.activeTab = tab;
            })
        );
    }

    return { createTab, removeTab, updateTab, getTab, setActiveTab };
};
