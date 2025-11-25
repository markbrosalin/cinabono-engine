import { CrudStore } from "../contracts";
import { InMemoryReadUpdateStore } from "./readupdate";
export declare class InMemoryCrudStore<K, V> extends InMemoryReadUpdateStore<K, V> implements CrudStore<K, V> {
    insert(key: K, value: V): void;
    remove(key: K): V | undefined;
    clear(): void;
}
//# sourceMappingURL=crud.d.ts.map