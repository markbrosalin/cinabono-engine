import { DepsFactories } from "../../deps/api-factories";
import { TabStoreSetup } from "../../tab-store";
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
