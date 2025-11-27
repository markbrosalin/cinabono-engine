import { SimInputEvent, SimOutputEvent } from "../../../../model/SimulatorStep.types.js";
import { GenerationTrackerContract } from "../GenerationTracker/index.js";
import { SimulationCtx } from "../../../../model/index.js";
export interface InputHandlerContract {
    handle(ev: SimInputEvent): boolean;
}
export interface OutputHandlerContract {
    handle(ev: SimOutputEvent): boolean;
}
export type InOutHandlerDeps = Pick<SimulationCtx, "getItem"> & {
    genTracker: GenerationTrackerContract;
};
//# sourceMappingURL=contracts.d.ts.map