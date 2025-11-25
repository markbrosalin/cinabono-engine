import { Id } from "@cnbn/schema";
import { TabStoreContract } from "./store";
import { TabContract } from "../tab-factory/tab";
type TabMap = Map<Id, TabContract>;
export interface TabStoreFactoryOverrides {
    initialTabs?: TabMap;
    makeTabStore?: (tabMap?: TabMap) => TabStoreContract;
}
export declare class TabStoreSetup {
    static init(overrides?: TabStoreFactoryOverrides): TabStoreContract;
}
export {};
//# sourceMappingURL=setup.d.ts.map