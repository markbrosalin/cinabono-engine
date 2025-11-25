import { ApiFactories, ApiBuilder, API_CONFIGS } from "../../api";
import { DIContainer } from "@cnbn/di";
import { deepMerge } from "@cnbn/utils";
export const buildEngineApi = (deps, plugins) => {
    const container = new DIContainer();
    const builder = new ApiBuilder({ container, ...deps });
    const depsCtx = {
        token: ApiFactories.token,
        config: ApiFactories.config,
        tokens: deps.apiSpec,
    };
    // register plugin tokens to token tree
    for (const plugin of plugins) {
        const res = plugin.api?.(depsCtx);
        if (res?.tree)
            deepMerge(deps.apiSpec.plugins, res.tree);
    }
    // pushes api plugins to all engine api configs
    plugins.forEach((p) => {
        const configs = p.api?.(depsCtx).configs;
        configs?.forEach((cfg) => API_CONFIGS.push(cfg));
    });
    // register api configs to container
    API_CONFIGS.forEach((cfg) => {
        const { token, factory, wrappedBy } = cfg(deps.apiSpec);
        deps.safeRunner.run("api-registry", () => container.register({
            token,
            useValue: { factory, wrappedBy },
        }));
    });
    return builder.buildApi();
};
