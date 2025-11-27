import * as Api from "../api/index.js";
import * as Deps from "../deps/index.js";
import { EngineDeps } from "../engine/helpers/index.js";
export type EnginePlugin = {
    name: string;
    deps?: (ctx: PluginDeps["ctx"]) => PluginDeps["result"];
    api?: (ctx: PluginApi["ctx"]) => PluginApi["result"];
    wrappers?: Api.ApiWrapper[];
    setup?(ctx: {
        deps: EngineDeps;
        api: Api.EngineApi["api"];
    }): void | Promise<void>;
};
export type PluginDeps = {
    ctx: {
        token: typeof Deps.DepsFactories.token;
        config: typeof Deps.DepsFactories.config;
        tokens: Deps.DepsSpec;
    };
    result: {
        tree?: Partial<Deps.PluginDepsSpec>;
        configs?: Deps.DepsConfigFactory<any>[];
    };
};
export type PluginApi = {
    ctx: {
        token: typeof Api.ApiFactories.token;
        config: typeof Api.ApiFactories.config;
        tokens: Api.ApiSpec;
    };
    result: {
        tree?: Partial<Api.PluginApiSpec>;
        configs?: Api.ApiConfigFactory<any>[];
    };
};
//# sourceMappingURL=types.d.ts.map