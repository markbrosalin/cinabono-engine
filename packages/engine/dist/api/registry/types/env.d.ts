import { ApiRegEventBus } from "../../../api/registry/types/contracts";
import { RegisteredUseCase } from "../../../api/registry/types/entity";
import { ApiFromSpec, Spec, UseCaseWrapper } from "../../../api/types";
/**
 * Context for use case registration and tree building
 */
export interface ExecutionEnv<S extends Spec> {
    bus: ApiRegEventBus;
    globalWrappers?: UseCaseWrapper<S>[];
    entries: RegisteredUseCase<S>[];
    options?: {
        allowOverride?: boolean;
        maxLoopDepth?: number;
    };
}
/**
 * Invoker inner context for use case composer and ctx builder
 */
export interface RuntimeEnv<S extends Spec> extends ExecutionEnv<S> {
    api: ApiFromSpec<S>;
    entry: RegisteredUseCase<S>;
    wrappers: UseCaseWrapper<S>[];
}
/**
 *  Constructor deps of ApiRegister
 */
export type ApiRegistryEnv<S extends Spec> = Omit<ExecutionEnv<S>, "entries"> & {
    apiSpec: S;
};
//# sourceMappingURL=env.d.ts.map