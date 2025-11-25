import { EngineCtx } from "../../../engine/types/context";
import { ApiRegistryEvents } from "../../../eventBus/events";
import { ApiTree } from "../../../use-cases/api-core/types";
import { FlowToolFactory } from "../../../use-cases/tools/FlowTool/types";
import { EventBus } from "@repo/entities-runtime/eventBus";
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