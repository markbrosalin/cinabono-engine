import { CrudStore } from "../contracts/index.js";
import { InMemoryReadUpdateStore } from "./readupdate.js";
export declare class InMemoryCrudStore<K, V> extends InMemoryReadUpdateStore<K, V> implements CrudStore<K, V> {
    insert(key: K, value: V): void;
    remove(key: K): V | undefined;
    clear(): void;
}
//# sourceMappingURL=crud.d.ts.map