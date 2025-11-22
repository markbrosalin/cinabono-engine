export abstract class MultipleStoresService<TStores, TTools> {
    protected _stores: TStores | undefined;
    protected _tools: TTools | undefined;

    constructor({ stores, tools }: { stores: TStores; tools: TTools }) {
        this._stores = stores;
        this._tools = tools;
    }

    public get stores(): TStores {
        if (!this._stores) throw new Error("[StoreService]: 'stores' are undefined");
        return this._stores;
    }

    public get tools(): TTools {
        if (!this._tools) throw new Error("[StoreService]: 'tools' are undefined");
        return this._tools;
    }

    public kill(): void {
        this._stores = undefined;
        this._tools = undefined;
    }
}
