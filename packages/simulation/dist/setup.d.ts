import * as core from "./core/index.js";
import { SimulationFactoriesOverrides, SimulationCtx } from "./model/index.js";
export declare class SimulationRunnerSetup {
    static init(ctx: SimulationCtx, overrides?: SimulationFactoriesOverrides): core.SimulationRunnerContract;
    private static _initStepSimulatorDeps;
    private static _initInfra;
}
//# sourceMappingURL=setup.d.ts.map