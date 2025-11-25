import { ApiFromSpec, Spec, SpecPaths, UseCaseFnAt, CoreApiSpec } from "../../api/types";
import { BaseFn } from "@repo/schema";
export type Visibility = "public" | "internal";
export type UseCaseSpec<FnType extends BaseFn, V extends Visibility> = {
    name: string;
    visibility: V;
} & {
    __type__?: FnType;
};
export type UseCaseFactory<S extends Spec = CoreApiSpec, P extends SpecPaths<S> = SpecPaths<S>, Fn = UseCaseFnAt<S, P>> = (ctx: UseCaseCtx<S>) => Fn;
export type UseCaseWrapper<S extends Spec = CoreApiSpec> = {
    <Fn extends BaseFn = BaseFn>(ctx: UseCaseCtx<S>, next: Fn): unknown;
} & {
    __name__?: string;
};
export type UseCaseCtx<S extends Spec> = {
    api: ApiFromSpec<S>;
    meta: UseCaseCtxMeta;
};
export type UseCaseCtxMeta = {
    traceId: string;
    spanId: string;
    parentId?: string;
    path: string;
    ucName: string;
    depth: number;
    maxDepth: number;
};
//# sourceMappingURL=entity.d.ts.map