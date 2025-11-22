export class AsyncCacheMap<K, V> {
    private _cache = new Map<K, Promise<V>>();

    constructor(private readonly _builder: (key: K) => Promise<V>) {}

    public get(key: K): Promise<V> {
        let p = this._cache.get(key);
        if (!p) {
            p = this._builder(key).catch((err) => {
                this._cache.delete(key);
                throw err;
            });
            this._cache.set(key, p);
        }
        return p;
    }

    public warm(key: K): void {
        void this.get(key);
    }

    public invalidate(key: K): void {
        this._cache.delete(key);
    }

    public clear(): void {
        this._cache.clear();
    }
}
