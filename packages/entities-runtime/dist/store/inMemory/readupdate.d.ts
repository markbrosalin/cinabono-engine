import { ReadUpdateStore } from "../contracts";
import { InMemoryReadonlyStore } from "./readonly";
export declare class InMemoryReadUpdateStore<K, V> extends InMemoryReadonlyStore<K, V> implements ReadUpdateStore<K, V> {
    update(key: K, updater: (prev: V) => V): boolean;
}
//# sourceMappingURL=readupdate.d.ts.map