import { ApiSpec } from "@engine/api/token-spec";
import { ApiWrapper, EngineApi, ResolvedApi } from "@engine/api/types";
import { EngineDeps } from "@engine/engine/helpers";
import { EngineInfra } from "@engine/infra/types";
import { DIContainerContract } from "okee-di-container";

/**
 * Context for use case registration and tree building
 */
export interface ExecutionEnv extends ApiBuilderEnv {}

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
