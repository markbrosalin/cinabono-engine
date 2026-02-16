import {
    UpdateIOParams,
    RunnerResult,
    PropagateOutputParams,
    RunConfig,
    SimulationStatus,
} from "@sim/model";
import { SimInputEvent, SimOutputEvent, Tick } from "@sim/model/SimulatorStep.types";

export interface SimulationRunnerContract {
    setInteractiveRunning(): void;
    setInteractivePaused(): void;
    setTestbench(): void;

    kill(): void;
    getNow(): Tick;
    updateInput(params: UpdateIOParams): SimInputEvent[];
    updateOutput(params: UpdateIOParams): SimOutputEvent[];
    propagateOutput(params: PropagateOutputParams): SimInputEvent[];
    getStatus(): SimulationStatus;

    simulate(runCfg?: Partial<RunConfig>): RunnerResult;
}
