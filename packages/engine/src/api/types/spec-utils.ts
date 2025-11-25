import { ApiSpec } from "@engine/api/public";
import { ApiToken } from "@engine/api/types/di";
import { Keys, LeafPaths, NodeAt } from "@cnbn/schema";

export type SpecPaths = LeafPaths<ApiSpec, ApiToken> & string;

export type PublicSpecPaths = LeafPaths<PublicApiSpec<ApiSpec>, ApiToken> & string;

export type UseCaseConfigAtPath<P extends SpecPaths> =
    NodeAt<ApiSpec, P> extends ApiToken<infer F, infer V> ? ApiToken<F, V> : never;

export type UseCaseFnAtPath<P extends string> =
    NodeAt<ApiSpec, P> extends ApiToken<infer T> ? T : never;

export type VisibleAt<P extends string> =
    NodeAt<ApiSpec, P> extends ApiToken<infer _F, infer V> ? V : never;

export type PublicApiSpec<S = ApiSpec> = {
    [K in Keys<S> as S[K] extends ApiToken<infer _F, "internal">
        ? never
        : K]: S[K] extends ApiToken<infer _F, "public"> ? S[K] : PublicApiSpec<S[K]>;
};

export type ApiFromSpec<S = ApiSpec> = {
    [K in Keys<S>]: S[K] extends ApiToken<infer F>
        ? F
        : S[K] extends infer T
          ? ApiFromSpec<T>
          : never;
};

export type PublicApiFromSpec<S = PublicApiSpec> = {
    [K in Keys<S>]: S[K] extends ApiToken<infer F> ? F : PublicApiFromSpec<S[K]>;
};

export type PublicApiByPath = {
    [P in PublicSpecPaths]: UseCaseFnAtPath<P>;
};
