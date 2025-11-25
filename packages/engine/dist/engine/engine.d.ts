import { EngineApi } from "../api";
import { EngineDeps } from "../deps";
import { EngineOptionsType } from "../engine/options";
import { EngineInfra } from "../infra/types";
import { EnginePlugin } from "../plugins";
export declare class CinabonoEngine {
    private readonly _ctx;
    constructor(_ctx: {
        api: EngineApi["publicApi"];
        deps: EngineDeps;
        infra: EngineInfra;
        plugins: EnginePlugin[];
        options: EngineOptionsType;
    });
    get api(): import("../api/types").PublicApiFromSpec;
    get deps(): import("@cnbn/di").BindTokensToInstances<import("../deps").DepsSpec>;
    get plugins(): EnginePlugin[];
    get infra(): EngineInfra;
    get options(): {
        readonly ignoreErrorsSetup: boolean;
    };
    sub(): void;
}
//# sourceMappingURL=engine.d.ts.map