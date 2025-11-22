import { ApiSpec } from "@engine/api/public";
import { ApiToken } from "@engine/api/types/di";
import { Keys, LeafPaths, NodeAt } from "@cnbn/schema";

export type SpecPaths = LeafPaths<ApiSpec, ApiToken> & string;

export type UseCaseConfigAtPath<P extends SpecPaths> =
    NodeAt<ApiSpec, P> extends ApiToken<infer F, infer V> ? ApiToken<F, V> : never;

export type UseCaseFnAtPath<P extends string> =
    NodeAt<ApiSpec, P> extends ApiToken<infer F> ? F : never;

export type VisibleAt<P extends string> =
    NodeAt<ApiSpec, P> extends ApiToken<infer _F, infer V> ? V : never;

export type ApiFromSpec<S> = {
    [K in Keys<S>]: S[K] extends ApiToken<infer F>
        ? F
        : S[K] extends infer T
          ? ApiFromSpec<T>
          : never;
};

export type PublicApiFromSpec<S> = {
    [K in Keys<S> as S[K] extends ApiToken<infer _F, infer V>
        ? V extends "public"
            ? K
            : never
        : K]: S[K] extends ApiToken<infer F>
        ? F
        : S[K] extends infer T
          ? PublicApiFromSpec<T>
          : never;
};
