import { TabStoreContract } from "../../tab-store";
import { ComputeServiceContract, ScopeFactory, TemplateLibraryContract } from "@repo/modules-runtime";
import { TabFactory } from "../../tab-factory";
import { ItemBuilderFactory } from "../../item-builder";
import { TemplateBuilderFactory } from "../../template-builder/setup";
import { ApiFlatMap, ApiTree, DefaultApiTree } from "../../use-casess/api-registry";
import { PublicApi, UC_Middleware } from "../../use-casess";
import { PluginExtras } from "../../enginee/plugin";
import { EngineEventBusContract } from "@engine/eventBus/contracts";
import { BaseObj } from "@repo/schema";
export interface EngineCtx<Tree extends ApiTree = ApiTree> {
    core: EngineCtxCore;
    factories: EngineCtxFactories;
    stores: EngineCtxStores;
    api: PublicApi<Tree>;
    plugins?: EngineCtxPlugins<Tree>;
}
export type EngineCtxCore = {
    bus: EngineEventBusContract;
    itemCompute: ComputeServiceContract;
};
export type EngineCtxStores = {
    tab: TabStoreContract;
    itemLibrary: TemplateLibraryContract;
};
export type EngineCtxFactories = {
    tab: TabFactory;
    scope: ScopeFactory;
    itemBuilder: ItemBuilderFactory;
    tplBuilder: TemplateBuilderFactory;
};
export type EngineCtxPlugins<Tree extends ApiTree> = {
    extras?: PluginExtras;
    globalMiddlewares?: UC_Middleware<Tree, BaseObj>[];
};
export type CoreApiTree = typeof DefaultApiTree;
export type EngineApi<T extends ApiTree> = ApiFlatMap<T>;
//# sourceMappingURL=context.d.ts.map