import { ScopeStoreContract } from "@cnbn/modules-runtime/scope-store";
import { ItemStoreContract } from "@cnbn/modules-runtime/item-store";
import { LinkStoreContract } from "@cnbn/modules-runtime/link-store";
import { SimulationCtx, SimulationRunnerContract } from "@cnbn/simulation/";
import { ComputeServiceContract } from "@cnbn/modules-runtime";
import { TabCreatorContract } from "./creator";
import { Id } from "@cnbn/schema";
import { TabContract } from "./tab";

export interface TabFactoryOverrides {
    makeTabCreator?: () => TabCreatorContract;
}

export type TabFactory = (id?: Id) => TabContract;

export interface TabCtx {
    itemStore: ItemStoreContract;
    scopeStore: ScopeStoreContract;
    linkStore: LinkStoreContract;
    simulation: SimulationRunnerContract;
    // itemOptionsStore: ItemOptionsStoreContract;
}

export interface TabCreatorDeps {
    itemCompute: ComputeServiceContract;
    makeItemStore: () => ItemStoreContract;
    makeScopeStore: () => ScopeStoreContract;
    makeLinkStore: () => LinkStoreContract;
    makeSimulation: (ctx: SimulationCtx) => SimulationRunnerContract;
    // makeItemOptionsStore: () => ItemOptionsStoreContract;
}
