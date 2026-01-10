import { EngineApi } from "@engine/api";
import { EngineDeps } from "@engine/deps";
import { EngineOptionsType } from "@engine/engine/options";
import { EngineInfra } from "@engine/infra/types";
import { EnginePlugin } from "@engine/plugins";

export class CinabonoEngine {
    constructor(
        private readonly _ctx: {
            api: EngineApi["publicApi"];
            deps: EngineDeps;
            infra: EngineInfra;
            plugins: EnginePlugin[];
            options: EngineOptionsType;
        }
    ) {}

    public get api() {
        return this._ctx.api;
    }

    public get deps() {
        return this._ctx.deps;
    }

    public get plugins() {
        return this._ctx.plugins;
    }

    public get infra() {
        return this._ctx.infra;
    }

    public get options() {
        return this._ctx.options;
    }
}
