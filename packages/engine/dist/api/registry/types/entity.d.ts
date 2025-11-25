import { ApiFromSpec, PublicApiFromSpec, Spec, SpecPaths, UseCaseFactory, UseCaseWrapper } from "../../../api/types";
import { Visibility } from "../../../use-cases";
export type RegisteredUseCase<S extends Spec, P extends SpecPaths<S> = SpecPaths<S>> = {
    name: string;
    path: P;
    visibility: Visibility;
    factory: UseCaseFactory<S>;
    wrappers?: UseCaseWrapper<S>[];
} & ApiRegLocalOpts;
export type ApiRegLocalOpts = {
    override?: boolean;
};
export type BuiltApi<S extends Spec> = {
    api: ApiFromSpec<S>;
    publicApi: PublicApiFromSpec<S>;
};
//# sourceMappingURL=entity.d.ts.map