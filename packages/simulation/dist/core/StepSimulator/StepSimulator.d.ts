import * as Types from "../../model/SimulatorStep.types.js";
import { StepSimulatorContract } from "./contract.js";
import { StepSimulatorDeps, RunConfig } from "../../model/config/index.js";
export declare class DefaultStepSimulator implements StepSimulatorContract {
    private readonly _deps;
    constructor(_deps: StepSimulatorDeps);
    getNow(): Types.Tick;
    isFinished(): boolean;
    scheduleInput(target: Types.InputCore): Types.SimInputEvent[];
    scheduleOutput(target: Types.OutputCore): Types.SimOutputEvent[];
    runOneTick(options?: Partial<RunConfig>): Types.PinUpdate[];
    resetCurrentSession(): void;
    reset(): void;
    private _dispatch;
    private _handleInput;
    private _planOutputs;
    private _handleOutput;
    private _fanoutFromDriver;
    propagateOutput(target: Types.PropagateOutputParams): Types.SimInputEvent[];
    private _stabilizeCycle;
}
//# sourceMappingURL=StepSimulator.d.ts.map