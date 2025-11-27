import { PropagateOutputParams, RunConfig, InputCore, OutputCore, PinUpdate, SimInputEvent, SimOutputEvent, Tick } from "../../model/index.js";
export interface StepSimulatorContract {
    getNow(): Tick;
    isFinished(): boolean;
    runOneTick(opts: RunConfig): PinUpdate[];
    propagateOutput(target: PropagateOutputParams): SimInputEvent[];
    scheduleInput(target: InputCore): SimInputEvent[];
    scheduleOutput(target: OutputCore): SimOutputEvent[];
    resetCurrentSession(): void;
    reset(): void;
}
//# sourceMappingURL=contract.d.ts.map