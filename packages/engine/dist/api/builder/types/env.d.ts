import { ApiSpec } from "../../../api/token-spec/index.js";
import { ApiWrapper, EngineApi, ResolvedApi } from "../../../api/types/index.js";
import { EngineDeps } from "../../../engine/helpers/index.js";
import { EngineInfra } from "../../../infra/types.js";
import { DIContainerContract } from "@cnbn/di";
/**
 * Context for use case registration and tree building
 */
export interface ExecutionEnv extends ApiBuilderEnv {
}
/**
 * Invoker inner context for use case composer and ctx builder
 */
export interface RuntimeEnv extends ExecutionEnv {
    api: EngineApi["api"];
    usecase: ResolvedApi;
    wrappers: ApiWrapper[];
}
/**
 *  Constructor deps of ApiRegister
 */
export interface ApiBuilderEnv extends Pick<EngineInfra, "safeRunner"> {
    container: DIContainerContract;
    apiSpec: ApiSpec;
    deps: EngineDeps;
    globalWrappers?: ApiWrapper[];
    opts?: ApiBuilderOptions;
}
export interface ApiBuilderOptions {
    allowOverride?: boolean;
    maxLoopedCalls?: number;
}
//# sourceMappingURL=env.d.ts.map