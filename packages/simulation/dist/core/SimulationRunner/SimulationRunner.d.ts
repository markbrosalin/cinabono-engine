import { SimInputEvent, SimOutputEvent, Tick, RunnerResult, RunConfig, UpdateIOParams, PropagateOutputParams, RunnerDeps } from "../../model";
import { SimulationRunnerContract } from "./contract";
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
    simulate(options?: Partial<RunConfig>): RunnerResult;
    private _runLoop;
    private _runUntilCompletion;
    private _runLimitedTicks;
    private _clearLastSessionData;
}
//# sourceMappingURL=SimulationRunner.d.ts.map