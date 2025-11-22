export abstract class ToolsService<TTools> {
    protected _tools: TTools | undefined;

    constructor({ tools }: { tools: TTools }) {
        this._tools = tools;
    }

    public get tools(): TTools {
        if (!this._tools) throw new Error("[StoreService]: 'tools' is undefined");
        return this._tools;
    }

    public kill(): void {
        this._tools = undefined;
    }
}
