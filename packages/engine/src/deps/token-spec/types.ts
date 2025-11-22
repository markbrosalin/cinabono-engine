import { EngineEventBusContract } from "@engine/eventBus";
import { ItemBuilderFactory } from "@engine/item-builder";
import { TabFactory } from "@engine/tab-factory";
import { TabStoreContract } from "@engine/tab-store";
import { DiToken } from "@cnbn/di";
import {
    TemplateLibraryContract,
    ItemStoreContract,
    ScopeStoreContract,
    LinkStoreContract,
    ScopeFactory,
    ComputeServiceContract,
    ItemFactory,
} from "@cnbn/modules-runtime";
import { AsFactory } from "@cnbn/schema";
import { SimulationRunnerContract, SimulationCtx } from "@cnbn/simulation";

export interface DepsSpec {
    core: CoreDepsSpec;
    stores: StoresDepsSpec;
    factories: FactoriesDepsSpec;
    builders: BuildersDepsSpec;
    services: ServicesDepsSpec;
    plugins: PluginDepsSpec;
}

export interface CoreDepsSpec {
    bus: DiToken<EngineEventBusContract>;
}

export interface StoresDepsSpec {
    tab: DiToken<TabStoreContract>;
    template: DiToken<TemplateLibraryContract>;
}

export interface FactoriesDepsSpec {
    itemStore: DiToken<AsFactory<ItemStoreContract>>;
    scopeStore: DiToken<AsFactory<ScopeStoreContract>>;
    linkStore: DiToken<AsFactory<LinkStoreContract>>;
    simulation: DiToken<AsFactory<SimulationRunnerContract, [SimulationCtx]>>;
    tab: DiToken<TabFactory>;
    scope: DiToken<ScopeFactory>;
    item: DiToken<ItemFactory>;
}

export interface BuildersDepsSpec {
    item: DiToken<ItemBuilderFactory>;
    // template: Token<TemplateBuilderFactory>;
}

export interface ServicesDepsSpec {
    itemCompute: DiToken<ComputeServiceContract>;
}

export interface PluginDepsSpec {}
