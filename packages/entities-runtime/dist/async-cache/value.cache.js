export class AsyncCacheValue {
    constructor(_builder) {
        this._builder = _builder;
    }
    get() {
        if (!this._value)
            this._value = this._builder();
        return this._value;
    }
    warm() {
        void this.get();
    }
    invalidate() {
        this._value = undefined;
    }
    clear() {
        this.invalidate();
    }
}
