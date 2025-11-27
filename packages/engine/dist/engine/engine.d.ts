import { EngineApi } from "../api/index.js";
import { EngineDeps } from "../deps/index.js";
import { EngineOptionsType } from "../engine/options.js";
import { EngineInfra } from "../infra/types.js";
import { EnginePlugin } from "../plugins/index.js";
export declare class CinabonoEngine {
    private readonly _ctx;
    constructor(_ctx: {
        api: EngineApi["publicApi"];
        deps: EngineDeps;
        infra: EngineInfra;
        plugins: EnginePlugin[];
        options: EngineOptionsType;
    });
    get api(): import("../api/types/index.js").PublicApiFromSpec;
    get deps(): import("@cnbn/di").BindTokensToInstances<import("../deps/index.js").DepsSpec>;
    get plugins(): EnginePlugin[];
    get infra(): EngineInfra;
    get options(): {
        readonly ignoreErrorsSetup: boolean;
    };
    sub(): void;
}
//# sourceMappingURL=engine.d.ts.map