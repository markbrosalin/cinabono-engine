import { ApiFunc, ApiTree } from "../../use-cases/api-registry";
import { ApiCtx } from "../../use-cases/ApiExecutor";
export type ApiUseCase<Deps extends Record<string, unknown> = {}, Fn extends ApiFunc<Deps> = ApiFunc<Deps>> = Fn & {
    __meta__: ApiUseCaseMeta<Deps>;
    wrappedWith(...mw: ApiUseCaseMiddleware<ApiTree, Deps>[]): ApiUseCase<Deps, Fn>;
};
export interface ApiUseCaseMeta<Deps extends Record<string, unknown> = {}> {
    deps: Deps;
    middlewares: ApiUseCaseMiddleware<ApiTree, Deps>[];
    name?: string;
}
export type ApiUseCaseMiddleware<Tree extends ApiTree = ApiTree, Deps extends Record<string, unknown> = {}> = (ctx: ApiCtx<Tree, Deps>, next: () => unknown) => unknown;
//# sourceMappingURL=types.d.ts.map