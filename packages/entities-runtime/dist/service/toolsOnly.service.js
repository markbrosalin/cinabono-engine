export class ToolsService {
    constructor({ tools }) {
        this._tools = tools;
    }
    get tools() {
        if (!this._tools)
            throw new Error("[StoreService]: 'tools' is undefined");
        return this._tools;
    }
    kill() {
        this._tools = undefined;
    }
}
