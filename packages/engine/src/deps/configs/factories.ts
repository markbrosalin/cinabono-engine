import { DepsFactories } from "@engine/deps/api-factories";
import { TabFactorySetup } from "@engine/tab-factory";
import {
    ItemFactorySetup,
    ItemStoreSetup,
    LinkStoreSetup,
    ScopeFactorySetup,
    ScopeStoreSetup,
} from "@cnbn/modules-runtime";
import { SimulationRunnerSetup } from "@cnbn/simulation";

export const FactoriesDepsCongis = [
    DepsFactories.config((tokens) => ({
        token: tokens.factories.tab,

        useFactory: (get) => {
            const { factories, services } = tokens;
            return TabFactorySetup.init({
                itemCompute: get(services.itemCompute),
                makeItemStore: get(factories.itemStore),
                makeLinkStore: get(factories.linkStore),
                makeScopeStore: get(factories.scopeStore),
                makeSimulation: get(factories.simulation),
            });
        },
        lifetime: "singleton",
    })),
    DepsFactories.config((tokens) => ({
        token: tokens.factories.scope,
        useFactory: () => ScopeFactorySetup.init(),
        lifetime: "singleton",
    })),
    DepsFactories.config((tokens) => ({
        token: tokens.factories.item,
        useFactory: () => ItemFactorySetup.init(),
        lifetime: "singleton",
    })),
    DepsFactories.config((tokens) => ({
        token: tokens.factories.itemStore,
        useFactory: () => ItemStoreSetup.init.bind(ItemStoreSetup),
        lifetime: "singleton",
    })),
    DepsFactories.config((tokens) => ({
        token: tokens.factories.linkStore,
        useFactory: () => LinkStoreSetup.init.bind(LinkStoreSetup),
        lifetime: "singleton",
    })),
    DepsFactories.config((tokens) => ({
        token: tokens.factories.scopeStore,
        useFactory: () => ScopeStoreSetup.init.bind(ScopeStoreSetup),
        lifetime: "singleton",
    })),
    DepsFactories.config((tokens) => ({
        token: tokens.factories.simulation,
        useFactory: () => SimulationRunnerSetup.init.bind(SimulationRunnerSetup),
        lifetime: "singleton",
    })),
];
