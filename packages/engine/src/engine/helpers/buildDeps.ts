import { EnginePlugin, PluginDeps } from "@engine/plugins";
import { DEPS_CONFIGS, DEPS_SPEC, DepsFactories } from "@engine/deps";
import { bindTokensToInstances, DIContainer } from "@cnbn/di";
import { deepMerge } from "@cnbn/utils";
import { EngineInfra } from "@engine/infra";

export type EngineDeps = ReturnType<typeof buildEngineDeps>;

export const buildEngineDeps = (EngineDeps: EngineInfra, plugins: EnginePlugin[]) => {
    const container = new DIContainer();

    const depsCtx: PluginDeps["ctx"] = {
        token: DepsFactories.token,
        config: DepsFactories.config,
        tokens: DEPS_SPEC,
    };

    // register plugin tokens to token tree
    for (const plugin of plugins) {
        const res = plugin.deps?.(depsCtx);
        if (res?.tree) deepMerge(DEPS_SPEC.plugins, res.tree);
    }

    // pushes deps plugins to all engine deps configs
    for (const plugin of plugins) {
        const res = plugin.deps?.(depsCtx);
        res?.configs?.forEach((cfg) => DEPS_CONFIGS.push(cfg));
    }

    // register deps configs to container
    DEPS_CONFIGS.forEach((cfg) => {
        EngineDeps.safeRunner.run("deps-registry", () => {
            container.register(cfg(depsCtx.tokens));
        });
    });

    // replace tokens with their instances from configs
    return bindTokensToInstances(DEPS_SPEC, container.resolve.bind(container));
};
