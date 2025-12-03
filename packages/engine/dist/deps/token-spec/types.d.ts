import { EngineEventBusContract } from "../../eventBus/index.js";
import { ItemBuilderFactory } from "../../item-builder/index.js";
import { TabFactory } from "../../tab-factory/index.js";
import { TabStoreContract } from "../../tab-store/index.js";
import { DiToken } from "okee-di-container";
import { TemplateLibraryContract, ItemStoreContract, ScopeStoreContract, LinkStoreContract, ScopeFactory, ComputeServiceContract, ItemFactory } from "@cnbn/modules-runtime";
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
}
export interface ServicesDepsSpec {
    itemCompute: DiToken<ComputeServiceContract>;
}
export interface PluginDepsSpec {
}
//# sourceMappingURL=types.d.ts.map