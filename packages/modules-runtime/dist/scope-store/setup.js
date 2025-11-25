import { DefaultScopeStore } from "./store";
export class ScopeStoreSetup {
    static init(overrides = {}) {
        const itemMap = overrides.scopeMap ?? new Map();
        const itemStore = overrides.makeScopeStore?.(itemMap) ?? new DefaultScopeStore(itemMap);
        return itemStore;
    }
}
