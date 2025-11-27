import { buildEngineDeps } from "../engine/helpers/buildDeps";
import { buildEngineApi } from "../engine/helpers/buildApi";
import { API_SPEC } from "../api/token-spec";
import { EngineSafeRunner } from "../infra";
import { EngineOptions } from "../engine/options";
import { CinabonoEngine } from "../engine/engine";
export class CinabonoBuilder {
    plugins = [];
    options = EngineOptions;
    _infra = {
        safeRunner: new EngineSafeRunner(),
    };
    use(...plugins) {
        this.plugins.push(...plugins);
        return this;
    }
    configure(options) {
        Object.assign(this.options, options);
        return this;
    }
    async build() {
        const deps = buildEngineDeps(this._infra, this.plugins);
        const globalWrappers = this.plugins.flatMap((p) => p.wrappers ?? []);
        const { api, publicApi } = buildEngineApi({
            apiSpec: API_SPEC,
            globalWrappers,
            deps: deps,
            safeRunner: this._infra.safeRunner,
        }, this.plugins);
        // setup plugins
        for (const plugin of this.plugins)
            await plugin.setup?.({ api, deps });
        this._infra.safeRunner.throwIfErrors(this.options);
        return new CinabonoEngine({
            api: publicApi,
            deps,
            infra: this._infra,
            plugins: this.plugins,
            options: this.options,
        });
    }
}
