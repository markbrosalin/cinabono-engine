export declare abstract class MultipleStoresService<TStores, TTools> {
    protected _stores: TStores | undefined;
    protected _tools: TTools | undefined;
    constructor({ stores, tools }: {
        stores: TStores;
        tools: TTools;
    });
    get stores(): TStores;
    get tools(): TTools;
    kill(): void;
}
//# sourceMappingURL=multipleStores.service.d.ts.map