import { STORES_TOKENS } from "../../di/tokens/base";
import { TabStoreSetup } from "../../tab-store";
import { createDIConfig } from "@repo/di";
import { InMemoryLibraryStoreSetup } from "@repo/modules-runtime";
export const STORES_CONFIGS = [
    createDIConfig({
        token: STORES_TOKENS.template,
        useFactory: () => InMemoryLibraryStoreSetup.init(),
        lifetime: "singleton",
    }),
    createDIConfig({
        token: STORES_TOKENS.tab,
        useFactory: () => TabStoreSetup.init(),
        lifetime: "singleton",
    }),
];
