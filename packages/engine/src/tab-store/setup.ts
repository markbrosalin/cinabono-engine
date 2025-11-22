import { Id } from "@cnbn/schema";
import { DefaultTabStore, TabStoreContract } from "./store";
import { TabContract } from "@engine/tab-factory/tab";

type TabMap = Map<Id, TabContract>;

export interface TabStoreFactoryOverrides {
    initialTabs?: TabMap;
    makeTabStore?: (tabMap?: TabMap) => TabStoreContract;
}

export class TabStoreSetup {
    static init(overrides: TabStoreFactoryOverrides = {}): TabStoreContract {
        const tabMap = overrides.initialTabs ?? new Map();
        const tabStore = overrides.makeTabStore?.(tabMap) ?? new DefaultTabStore(tabMap);
        return tabStore;
    }
}
