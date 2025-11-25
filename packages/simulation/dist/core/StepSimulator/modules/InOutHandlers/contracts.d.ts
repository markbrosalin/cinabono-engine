import { SimInputEvent, SimOutputEvent } from "../../../../model/SimulatorStep.types";
import { GenerationTrackerContract } from "../GenerationTracker";
import { SimulationCtx } from "../../../../model";
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