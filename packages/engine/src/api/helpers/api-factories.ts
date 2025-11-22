import {
    ApiWrapper,
    ApiToken,
    ApiConfigFactory,
    ApiConfigData,
    Visibility,
} from "@engine/api/types";
import { BaseFn } from "@cnbn/schema/primitives";

export const ApiFactories = {
    config: <T extends ApiToken>(fn: ApiConfigFactory<T>) => fn,

    token: <Fn extends BaseFn, V extends Visibility>(
        name: string,
        visibility: V
    ): ApiToken<Fn, V> => ({
        visibility,
        name,
        id: Symbol(name),
        __type__: undefined as unknown as ApiConfigData<Fn>,
    }),

    wrapper: (name: string, fn: ApiWrapper) => {
        fn.__name__ = name;
        return fn;
    },
} as const;
