import { Entries } from "@cnbn/schema/primitives";
import { ReadonlyStore } from "../contracts";

export class InMemoryReadonlyStore<K, V> implements ReadonlyStore<K, V> {
    constructor(protected readonly map = new Map<K, V>()) {}

    public get(key: K): V | undefined {
        return this.map.get(key);
    }

    public export(): Entries<K, V> {
        return Array.from(this.map.entries());
    }

    public get size(): number {
        return this.map.size;
    }
}
