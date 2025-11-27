import { ReadUpdateStore } from "../contracts/index.js";
import { InMemoryReadonlyStore } from "./readonly.js";
export declare class InMemoryReadUpdateStore<K, V> extends InMemoryReadonlyStore<K, V> implements ReadUpdateStore<K, V> {
    update(key: K, updater: (prev: V) => V): boolean;
}
//# sourceMappingURL=readupdate.d.ts.map