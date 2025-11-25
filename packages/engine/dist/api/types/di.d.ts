import { ApiSpec } from "../../api/token-spec";
import { ApiFactory, ApiWrapper, Visibility } from "../../api/types";
import { DiConfig, DiToken } from "@cnbn/di";
import { BaseFn, UnionToIntersection } from "@cnbn/schema";
export type ApiFnType<T extends ApiToken = ApiToken> = T extends ApiToken<infer Fn> ? Fn : never;
export type ApiConfigData<Fn extends BaseFn> = {
    factory: ApiFactory<Fn>;
    wrappedBy?: ApiWrapper[];
};
export type ApiToken<Fn extends BaseFn = any, V extends Visibility = Visibility> = DiToken<ApiConfigData<Fn>> & {
    visibility: V;
};
export type ApiConfig<T extends ApiToken = ApiToken> = Pick<UnionToIntersection<DiConfig<T>>, "token" | "options"> & {
    useValue: ApiConfigData<ApiFnType<T>>;
};
export type ApiConfigFactory<T extends ApiToken = ApiToken> = (tokens: ApiSpec) => ApiConfigData<ApiFnType<T>> & Pick<ApiConfig<T>, "token">;
export type ResolvedApi<T extends ApiToken = ApiToken> = ApiConfigData<ApiFnType<T>> & {
    path: string;
    token: T;
};
//# sourceMappingURL=di.d.ts.map