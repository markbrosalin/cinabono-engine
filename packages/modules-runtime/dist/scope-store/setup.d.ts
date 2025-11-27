import { Id, Scope } from "@cnbn/schema";
import { ItemMap } from "../item-store/setup.js";
import { ScopeStoreContract } from "./store.js";
export type ScopeMap = Map<Id, Scope>;
export interface ScopeStoreFactoryOverrides {
    scopeMap?: ScopeMap;
    makeScopeStore?: (scopeMap?: ItemMap) => ScopeStoreContract;
}
export declare class ScopeStoreSetup {
    static init(overrides?: ScopeStoreFactoryOverrides): ScopeStoreContract;
}
//# sourceMappingURL=setup.d.ts.map