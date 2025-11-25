import { ApiFunc } from "../../use-cases/api-registry";
import { ApiUseCase } from "../../use-cases/use-case";
export declare const defineUseCase: (name?: string) => {
    readonly withDeps: <ND extends Record<string, unknown>>(deps: ND) => {
        runFn<D extends ND, Fn extends ApiFunc<ND> = ApiFunc<ND>>(fn: Fn): ApiUseCase<D, Fn>;
    };
    readonly runFn: <D extends Record<string, unknown> = {}, Fn extends ApiFunc<D> = ApiFunc<D>>(fn: Fn) => ApiUseCase<D, Fn>;
};
//# sourceMappingURL=defineUseCase.d.ts.map