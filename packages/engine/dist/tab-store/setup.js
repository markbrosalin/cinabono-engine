import { DefaultTabStore } from "./store.js";
export class TabStoreSetup {
    static init(overrides = {}) {
        const tabMap = overrides.initialTabs ?? new Map();
        const tabStore = overrides.makeTabStore?.(tabMap) ?? new DefaultTabStore(tabMap);
        return tabStore;
    }
}
