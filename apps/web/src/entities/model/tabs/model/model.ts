import { createStore } from "solid-js/store";
import { ITabStore } from "../types";
import { createTabsActions } from "./actions";

export type TabsModel = ReturnType<typeof createTabsModel>;

export const createTabsModel = () => {
    const [store, setStore] = createStore<ITabStore>({
        tabs: [],
        activeTab: undefined,
    });

    const actions = createTabsActions(store, setStore);

    return { store, actions };
};
