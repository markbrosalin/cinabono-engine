import { TabFactorySetup } from "../tab-factory";
import * as Modules from "@repo/modules-runtime";
import { DefaultEngine } from "./engine";
import { SimulationRunnerSetup } from "@repo/simulation";
import { ItemBuilderSetup } from "../item-builder/setup";
import { buildApiFromTree, DefaultApiTree } from "../use-cases/api-registry";
import { TemplateBuilderSetup } from "../template-builder";
import { EngineEventBusSetup } from "../eventBus/eventBus";
import { DefaultApiExecutor, makeDefaultFlowTool } from "../use-cases/tools";
import { TabStoreSetup } from "../tab-store/setup";
import { restrictBus } from "@repo/entities-runtime";
export class EngineSetup {
    static init(config = {}) {
        const { overrides } = config;
        const core = this._initCore(overrides);
        const stores = this._initStores(overrides);
        const tabCreatorDeps = this._initTabCreatorDeps(overrides);
        const factories = this._initFactories(core, stores, tabCreatorDeps, overrides);
        const executorBus = restrictBus(core.bus);
        // const [engineDeps, usecasesTree] = this._applyPlugins<P>(
        //     commonDeps,
        //     DefaultApiTree,
        //     plugins
        // );
        const apiMap = buildApiFromTree(DefaultApiTree);
        const executorDeps = {
            core: { ...core, bus: executorBus },
            factories,
            stores,
            infra: {
                makeFlow: makeDefaultFlowTool,
            },
        };
        const apiExecutor = new DefaultApiExecutor(apiMap, executorDeps);
        return new DefaultEngine(apiExecutor, apiMap);
    }
    static _initCore(ovrds = {}) {
        return {
            itemCompute: Modules.ComputeSetup.init(ovrds.computeService),
            bus: EngineEventBusSetup.init(ovrds.eventBus),
        };
    }
    static _initStores(ovrds = {}) {
        return {
            itemLibrary: Modules.InMemoryLibraryStoreSetup.init(ovrds.libraryStore),
            tab: TabStoreSetup.init(ovrds.tabStore),
        };
    }
    static _initTabCreatorDeps(ovrds = {}) {
        return {
            makeItemStore: () => Modules.ItemStoreSetup.init(ovrds?.itemStore),
            makeScopeStore: () => Modules.ScopeStoreSetup.init(ovrds?.scopeStore),
            makeLinkStore: () => Modules.LinkStoreSetup.init(ovrds?.linkStore),
            makeSimulation: (ctx) => SimulationRunnerSetup.init(ctx, ovrds?.simulation),
        };
    }
    static _initFactories(core, stores, tabDeps, ovrds = {}) {
        const itemFactory = Modules.ItemFactorySetup.init(ovrds?.itemFactory);
        const scopeFactory = Modules.ScopeFactorySetup.init(ovrds?.scopeFactory);
        return {
            scope: scopeFactory,
            tab: TabFactorySetup.init({ itemCompute: core.itemCompute, ...tabDeps }, ovrds?.tabFactory),
            itemBuilder: ItemBuilderSetup.init({
                getTemplate: stores.itemLibrary.get.bind(this),
                itemFactory,
                scopeFactory,
            }, ovrds?.itemBuilderFactory),
            tplBuilder: TemplateBuilderSetup.init(ovrds?.tplBuilderFactory),
        };
    }
}
