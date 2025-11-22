import { EnginePlugin } from "@engine/plugins";
import { buildEngineDeps } from "@engine/engine/helpers/buildDeps";
import { buildEngineApi } from "@engine/engine/helpers/buildApi";
import { API_SPEC } from "@engine/api/token-spec";
import { EngineInfra } from "@engine/infra/types";
import { EngineSafeRunner } from "@engine/infra";
import { EngineOptions, EngineOptionsType } from "@engine/engine/options";
import { CinabonoEngine } from "@engine/engine/engine";

export class CinabonoBuilder {
    public readonly plugins: EnginePlugin[] = [];
    public readonly options: EngineOptionsType = EngineOptions;

    private readonly _infra: EngineInfra = {
        safeRunner: new EngineSafeRunner(),
    };

    public use(...plugins: EnginePlugin[]) {
        this.plugins.push(...plugins);
        return this;
    }

    public configure(options: Partial<EngineOptionsType>) {
        Object.assign(this.options, options);
        return this;
    }

    public async build(): Promise<CinabonoEngine> {
        const deps = buildEngineDeps(this._infra, this.plugins);

        const globalWrappers = this.plugins.flatMap((p) => p.wrappers ?? []);

        const { api, publicApi } = buildEngineApi(
            {
                apiSpec: API_SPEC,
                globalWrappers,
                deps: deps,
                safeRunner: this._infra.safeRunner,
            },
            this.plugins
        );

        // setup plugins
        for (const plugin of this.plugins) await plugin.setup?.({ api, deps });

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
