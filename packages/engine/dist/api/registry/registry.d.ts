import { defineUseCase } from "../../api/helpers";
import { ApiRegLocalOpts, BuiltApi, ApiRegistryContract, ApiRegistryEnv } from "../../api/registry/types";
import { Spec, SpecPaths } from "../../api/types";
export declare class ApiRegistry<S extends Spec> implements ApiRegistryContract<S> {
    private readonly _deps;
    private readonly reg;
    constructor(_deps: ApiRegistryEnv<S>);
    register<P extends SpecPaths<S>>(path: P, usecase: ReturnType<typeof defineUseCase<S>>, opts?: ApiRegLocalOpts): void;
    private _resolveUseCaseSpec;
    buildApi(): BuiltApi<S>;
}
//# sourceMappingURL=registry.d.ts.map