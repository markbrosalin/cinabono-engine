import { createStore } from "solid-js/store";
import { TabStoreState } from "./types";
import { tabStoreMutations } from "./mutations";

export const createTabStore = () => {
    const [state, setState] = createStore<TabStoreState>({
        tabs: [],
        activeTab: undefined,
    });

    const mutations = tabStoreMutations(state, setState);

    return { state, mutations };
};
