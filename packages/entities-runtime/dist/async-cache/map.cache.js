export class AsyncCacheMap {
    constructor(_builder) {
        this._builder = _builder;
        this._cache = new Map();
    }
    get(key) {
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
    warm(key) {
        void this.get(key);
    }
    invalidate(key) {
        this._cache.delete(key);
    }
    clear() {
        this._cache.clear();
    }
}
