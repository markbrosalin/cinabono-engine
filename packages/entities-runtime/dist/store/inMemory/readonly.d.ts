import { Entries } from "@cnbn/schema/primitives";
import { ReadonlyStore } from "../contracts";
export declare class InMemoryReadonlyStore<K, V> implements ReadonlyStore<K, V> {
    protected readonly map: Map<K, V>;
    constructor(map?: Map<K, V>);
    get(key: K): V | undefined;
    export(): Entries<K, V>;
    get size(): number;
}
//# sourceMappingURL=readonly.d.ts.map