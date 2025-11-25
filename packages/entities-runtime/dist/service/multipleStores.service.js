export class MultipleStoresService {
    constructor({ stores, tools }) {
        this._stores = stores;
        this._tools = tools;
    }
    get stores() {
        if (!this._stores)
            throw new Error("[StoreService]: 'stores' are undefined");
        return this._stores;
    }
    get tools() {
        if (!this._tools)
            throw new Error("[StoreService]: 'tools' are undefined");
        return this._tools;
    }
    kill() {
        this._stores = undefined;
        this._tools = undefined;
    }
}
