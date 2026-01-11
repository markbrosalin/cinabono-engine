import { spliceAt, uniqueId } from "@cnbn/utils";
import { createStore, produce, SetStoreFunction } from "solid-js/store";
import { TabBarState, ITab, TabId } from "../types";
import { PartialExcept } from "@cnbn/schema";

export type TabActions = ReturnType<typeof createTabActions>;
export type TabStore = ReturnType<typeof createTabStore>;

const createTabActions = (state: TabBarState, setState: SetStoreFunction<TabBarState>) =>
    ({
        createTab: (args?: Partial<ITab>): ITab => {
            const newTab = {
                id: args?.id ?? uniqueId(),
                title: args?.title ?? "New Tab",
            };

            setState(produce((store) => store.tabs.push(newTab)));

            return newTab;
        },

        removeTab: (tabId: TabId): ITab | undefined => {
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
        },

        updateTab: (args: PartialExcept<ITab, "id">): ITab | undefined => {
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
        },

        getTab: (tabId: TabId): ITab | undefined => {
            return state.tabs.find((tab) => tab.id === tabId);
        },
    }) as const;

export const createTabStore = () => {
    const [state, setState] = createStore<TabBarState>({
        tabs: [],
    });

    const actions = createTabActions(state, setState);

    return { state, actions };
};
