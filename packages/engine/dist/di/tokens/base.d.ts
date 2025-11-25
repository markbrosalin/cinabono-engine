import { EngineEventBusContract } from "../../eventBus";
import { TabStoreContract } from "../../tab-store";
import { TemplateLibraryContract } from "@repo/modules-runtime";
export declare const CORE_TOKENS: {
    readonly bus: import("@repo/di").Token<EngineEventBusContract>;
};
export declare const STORES_TOKENS: {
    readonly tab: import("@repo/di").Token<TabStoreContract>;
    readonly template: import("@repo/di").Token<TemplateLibraryContract>;
};
export declare const SERVICES_TOKENS: {};
export declare const FACTORIES_TOKENS: {};
//# sourceMappingURL=base.d.ts.map