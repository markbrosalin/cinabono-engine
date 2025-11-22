export abstract class StoreService<TStore, TTools> {
    protected _store: TStore | undefined;
    protected _tools: TTools | undefined;

    constructor({ store, tools }: { store: TStore; tools: TTools }) {
        this._store = store;
        this._tools = tools;
    }

    public get store(): TStore {
        if (!this._store) throw new Error("[StoreService]: 'store' is undefined");
        return this._store;
    }

    public get tools(): TTools {
        if (!this._tools) throw new Error("[StoreService]: 'tools' is undefined");
        return this._tools;
    }

    public kill(): void {
        this._store = undefined;
        this._tools = undefined;
    }
}
