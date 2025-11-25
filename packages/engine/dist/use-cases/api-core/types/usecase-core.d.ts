import { ApiCtx } from "../../../use-cases/api-core/types/usecase-context";
import { BaseObj } from "@repo/schema";
export type Visibility = "public" | "internal";
export type ApiTree = {
    [k: string]: ApiTree | UseCase<any, any, any, any>;
};
export type UC_Factory<Deps extends BaseObj, Fn, T extends ApiTree> = (ctx: ApiCtx<T, Deps>) => Fn;
export type UC_Middleware<T extends ApiTree, Deps extends BaseObj> = ((ctx: ApiCtx<T, Deps>, next: (...args: unknown[]) => unknown) => unknown) & {
    __meta__: {
        name?: string;
    };
};
export type UC_Meta<T extends ApiTree, Deps extends BaseObj, V extends Visibility> = {
    deps: Deps;
    name?: string;
    visibility: V;
    middlewares: UC_Middleware<T, Deps>[];
};
export type UseCase<Deps extends BaseObj, Fn, T extends ApiTree, V extends Visibility = "public"> = UC_Factory<Deps, Fn, T> & {
    __meta__: UC_Meta<T, Deps, V>;
    wrappedWith(...mw: UC_Middleware<T, Deps>[]): UseCase<Deps, Fn, T, V>;
};
export type AllApi<T> = {
    [K in keyof T]: T[K] extends UseCase<any, infer Fn, any, any> ? Fn : T[K] extends object ? AllApi<T[K]> : never;
};
export type PublicApi<T> = {
    [K in keyof T as T[K] extends UseCase<any, any, any, infer V> ? V extends "public" ? K : never : T[K] extends object ? K : never]: T[K] extends UseCase<any, infer Fn, any, "public"> ? Fn : T[K] extends object ? PublicApi<T[K]> : never;
};
//# sourceMappingURL=usecase-core.d.ts.map