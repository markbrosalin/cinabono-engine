import { Id, Scope } from "@cnbn/schema";
import { ItemMap } from "../item-store/setup";
import { ScopeStoreContract, DefaultScopeStore } from "./store";

export type ScopeMap = Map<Id, Scope>;

export interface ScopeStoreFactoryOverrides {
    scopeMap?: ScopeMap;
    makeScopeStore?: (scopeMap?: ItemMap) => ScopeStoreContract;
}

export class ScopeStoreSetup {
    static init(overrides: ScopeStoreFactoryOverrides = {}): ScopeStoreContract {
        const itemMap = overrides.scopeMap ?? new Map();
        const itemStore = overrides.makeScopeStore?.(itemMap) ?? new DefaultScopeStore(itemMap);

        return itemStore;
    }
}
