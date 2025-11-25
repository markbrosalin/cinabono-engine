export declare const DEPS_TOKENS: {
    readonly core: {
        readonly bus: import("@repo/di").Token<import("../../eventBus").EngineEventBusContract>;
    };
    readonly services: {};
    readonly factories: {};
    readonly stores: {
        readonly tab: import("@repo/di").Token<import("../..").TabStoreContract>;
        readonly template: import("@repo/di").Token<import("@repo/modules-runtime").TemplateLibraryContract>;
    };
    readonly plugins: {};
};
//# sourceMappingURL=index.d.ts.map