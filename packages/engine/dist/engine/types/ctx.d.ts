import { TabStoreContract } from "../../tab-store";
import { ComputeServiceContract, ScopeFactory, TemplateLibraryContract } from "@repo/modules-runtime";
import { TabFactory } from "../../tab-factory";
import { ItemBuilderFactory } from "../../item-builder";
import { EngineFactoryConfig } from "./config";
import { TemplateBuilderFactory } from "../../template-builder/setup";
import { EngineSetup } from "../../engine/setup";
import { EngineEventBusContract } from "../../eventBus/eventBus";
import { EngineApi } from "../../engine/types/types";
import { ApiMiddleware } from "../../use-cases/ApiExecutor";
import { ApiTree } from "../../use-cases/api-registry";
export interface EngineCtx<Tree extends ApiTree> {
    core: {
        bus: EngineEventBusContract;
        itemCompute: ComputeServiceContract;
    };
    factories: {
        tab: TabFactory;
        scope: ScopeFactory;
        itemBuilder: ItemBuilderFactory;
        tplBuilder: TemplateBuilderFactory;
    };
    stores: {
        tab: TabStoreContract;
        library: TemplateLibraryContract;
    };
    api: EngineApi<Tree>;
    plugins?: {
        extras?: Record<string, unknown>;
        globalMiddlewares?: ApiMiddleware<Tree>[];
    };
}
export type EngineCore = ReturnType<(typeof EngineSetup)["_initCore"]>;
export type EngineOverrides = EngineFactoryConfig["overrides"];
export type EngineTabDeps = ReturnType<(typeof EngineSetup)["_initTabCreatorDeps"]>;
export type EngineFactories = ReturnType<(typeof EngineSetup)["_initFactories"]>;
export type EngineBuilders = ReturnType<(typeof EngineSetup)["_initBuilders"]>;
export type EngineUseCaseCtx = ReturnType<(typeof EngineSetup)["_initUseCaseCtx"]>;
//# sourceMappingURL=ctx.d.ts.map