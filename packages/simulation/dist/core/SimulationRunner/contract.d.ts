import { UpdateIOParams, RunnerResult, PropagateOutputParams, RunConfig } from "../../model";
import { SimInputEvent, SimOutputEvent, Tick } from "../../model/SimulatorStep.types";
export interface SimulationRunnerContract {
    setInteractiveRunning(): void;
    setInteractivePaused(): void;
    setTestbench(): void;
    kill(): void;
    getNow(): Tick;
    updateInput(params: UpdateIOParams): SimInputEvent[];
    updateOutput(params: UpdateIOParams): SimOutputEvent[];
    propagateOutput(params: PropagateOutputParams): SimInputEvent[];
    simulate(runCfg?: Partial<RunConfig>): RunnerResult;
}
//# sourceMappingURL=contract.d.ts.map