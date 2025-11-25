import { UseCaseSpec } from "../../api/types";
import { BaseObj, Keys, LeafPaths, NodeAt } from "@repo/schema";
export type Spec = Record<string, unknown>;
export type SpecPaths<S extends Spec> = LeafPaths<S, UseCaseSpec<any, any>> & string;
export type UseCaseSpecAt<S extends Spec, P extends SpecPaths<S>> = NodeAt<S, P> extends UseCaseSpec<infer F, infer V> ? UseCaseSpec<F, V> : never;
export type UseCaseFnAt<S extends Spec, P extends string> = NodeAt<S, P> extends UseCaseSpec<infer F, any> ? F : never;
export type VisibleAt<S extends Spec, P extends string> = NodeAt<S, P> extends UseCaseSpec<any, infer V> ? V : never;
export type ApiFromSpec<S extends Spec> = {
    [K in Keys<S>]: S[K] extends UseCaseSpec<infer F, any> ? F : S[K] extends BaseObj ? ApiFromSpec<S[K]> : never;
};
export type PublicApiFromSpec<S extends Spec> = {
    [K in Keys<S> as S[K] extends UseCaseSpec<any, infer V> ? V extends "public" ? K : never : K]: S[K] extends UseCaseSpec<infer F, any> ? F : S[K] extends BaseObj ? PublicApiFromSpec<S[K]> : never;
};
//# sourceMappingURL=utils.d.ts.map