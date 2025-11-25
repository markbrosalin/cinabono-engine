export class StoreService {
    constructor({ store, tools }) {
        this._store = store;
        this._tools = tools;
    }
    get store() {
        if (!this._store)
            throw new Error("[StoreService]: 'store' is undefined");
        return this._store;
    }
    get tools() {
        if (!this._tools)
            throw new Error("[StoreService]: 'tools' is undefined");
        return this._tools;
    }
    kill() {
        this._store = undefined;
        this._tools = undefined;
    }
}
