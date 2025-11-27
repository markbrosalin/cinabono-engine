import { DepsConfigFactory, DepsToken } from "../deps/types/di.js";
export declare const DepsFactories: {
    config: <T extends DepsToken>(fn: DepsConfigFactory<T>) => DepsConfigFactory<T>;
    token: <Type>(name: string) => DepsToken<Type>;
};
//# sourceMappingURL=api-factories.d.ts.map