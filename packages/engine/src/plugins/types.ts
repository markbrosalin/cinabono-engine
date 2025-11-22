/* eslint-disable @typescript-eslint/no-explicit-any */
import * as Api from "@engine/api";
import * as Deps from "@engine/deps";
import { EngineDeps } from "@engine/engine/helpers";

export type EnginePlugin = {
    name: string;

    deps?: (ctx: PluginDeps["ctx"]) => PluginDeps["result"];

    api?: (ctx: PluginApi["ctx"]) => PluginApi["result"];

    wrappers?: Api.ApiWrapper[];

    setup?(ctx: { deps: EngineDeps; api: Api.EngineApi["api"] }): void | Promise<void>;
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
