import { EngineCtx } from "../../../enginee/types/context";
import { ApiRegistryEvents } from "../../../eventBus/events";
import { ApiTree } from "../../../use-casess/api-core/types";
import { FlowToolFactory } from "@engine/use-casess/tools/FlowTool/types";
import { EventBus } from "../../../../../entities-runtime/dist/eventBu";
export type ApiExecutorBus = EventBus<ApiRegistryEvents>;
export interface ApiExecutorDeps<Tree extends ApiTree> {
    core: Omit<EngineCtx<Tree>["core"], "bus"> & {
        bus: ApiExecutorBus;
    };
    factories: EngineCtx<Tree>["factories"];
    stores: EngineCtx<Tree>["stores"];
    plugins?: EngineCtx<Tree>["plugins"];
    infra: {
        makeFlow: FlowToolFactory;
    };
    api: Tree;
    config: ApiExecutorConfig;
}
export interface ApiExecutorConfig {
    maxDepth?: number;
}
//# sourceMappingURL=executor.d.ts.map