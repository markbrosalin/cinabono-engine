import { Clearable, Insertable, Readable, Removable, Updatable } from "./methods";
export interface ReadonlyStore<K, V> extends Readable<K, V> {
}
export interface ReadUpdateStore<K, V> extends ReadonlyStore<K, V>, Updatable<K, V> {
}
export interface CrudStore<K, V> extends ReadUpdateStore<K, V>, Insertable<K, V>, Removable<K, V>, Clearable {
}
//# sourceMappingURL=stores.d.ts.map