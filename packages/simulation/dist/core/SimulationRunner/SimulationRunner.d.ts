import { SimInputEvent, SimOutputEvent, Tick, RunnerResult, RunConfig, UpdateIOParams, PropagateOutputParams, SimulationStatus, RunnerDeps } from "../../model/index.js";
import { SimulationRunnerContract } from "./contract.js";
export declare class DefaultSimulationRunner implements SimulationRunnerContract {
    private readonly _cfg;
    constructor(_cfg: RunnerDeps);
    setInteractiveRunning(): void;
    setInteractivePaused(): void;
    setTestbench(): void;
    kill(): void;
    updateInput(params: UpdateIOParams): SimInputEvent[];
    updateOutput(params: UpdateIOParams): SimOutputEvent[];
    propagateOutput(params: PropagateOutputParams): SimInputEvent[];
    getNow(): Tick;
    getStatus(): SimulationStatus;
    simulate(options?: Partial<RunConfig>): RunnerResult;
    private _runLoop;
    private _runUntilCompletion;
    private _runLimitedTicks;
    private _clearLastSessionData;
}
//# sourceMappingURL=SimulationRunner.d.ts.map