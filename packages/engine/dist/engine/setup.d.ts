import { EngineConfig } from "./types/config";
import { EngineContract } from "./engine";
import * as Types from "../engine/types";
import { EnginePlugin } from "../engine/plugin";
export declare class EngineSetup {
    static init<const P extends readonly EnginePlugin[] = []>(config?: EngineConfig<P>): EngineContract<Types.CoreApiTree>;
    private static _initCore;
    private static _initStores;
    private static _initTabCreatorDeps;
    private static _initFactories;
}
//# sourceMappingURL=setup.d.ts.map