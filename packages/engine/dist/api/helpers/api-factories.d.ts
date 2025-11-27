import { ApiWrapper, ApiToken, ApiConfigFactory, Visibility } from "../../api/types/index.js";
import { BaseFn } from "@cnbn/schema/primitives";
export declare const ApiFactories: {
    readonly config: <T extends ApiToken>(fn: ApiConfigFactory<T>) => ApiConfigFactory<T>;
    readonly token: <Fn extends BaseFn, V extends Visibility>(name: string, visibility: V) => ApiToken<Fn, V>;
    readonly wrapper: (name: string, fn: ApiWrapper) => ApiWrapper;
};
//# sourceMappingURL=api-factories.d.ts.map