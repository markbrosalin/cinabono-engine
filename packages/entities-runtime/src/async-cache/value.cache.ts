export class AsyncCacheValue<T> {
    private _value?: Promise<T>;

    constructor(private readonly _builder: () => Promise<T>) {}

    public get(): Promise<T> {
        if (!this._value) this._value = this._builder();
        return this._value;
    }
    public warm() {
        void this.get();
    }

    public invalidate() {
        this._value = undefined;
    }

    public clear() {
        this.invalidate();
    }
}
