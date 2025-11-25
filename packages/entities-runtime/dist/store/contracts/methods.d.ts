export interface Exportable<T> {
    export(): T;
}
export interface Insertable<K, V> {
    insert(key: K, value: V): void;
}
export interface Removable<K, V> {
    remove(key: K): V | undefined;
}
export interface Clearable {
    clear(): void;
}
export interface Readable<K, V> {
    get(key: K): V | undefined;
}
export interface Updatable<K, V> {
    update(key: K, updater: (prev: V) => V): boolean;
}
export interface Resettable {
    reset(): void;
}
export interface Size {
    get size(): number;
}
//# sourceMappingURL=methods.d.ts.map