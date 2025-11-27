import { DepsFactories } from "../../deps/api-factories.js";
import { TabStoreSetup } from "../../tab-store/index.js";
import { InMemoryLibraryStoreSetup } from "@cnbn/modules-runtime";
export const StoredDepsConfigs = [
    DepsFactories.config((tokens) => ({
        token: tokens.stores.template,
        useFactory: () => InMemoryLibraryStoreSetup.init(),
        lifetime: "singleton",
    })),
    DepsFactories.config((tokens) => ({
        token: tokens.stores.tab,
        useFactory: () => TabStoreSetup.init(),
        lifetime: "singleton",
    })),
];
