export declare abstract class StoreService<TStore, TTools> {
    protected _store: TStore | undefined;
    protected _tools: TTools | undefined;
    constructor({ store, tools }: {
        store: TStore;
        tools: TTools;
    });
    get store(): TStore;
    get tools(): TTools;
    kill(): void;
}
//# sourceMappingURL=singleStore.service.d.ts.map