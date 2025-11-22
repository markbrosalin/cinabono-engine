import { SimInputEvent, SimOutputEvent } from "@sim/model/SimulatorStep.types";
import { GenerationTrackerContract } from "../GenerationTracker";
import { SimulationCtx } from "@sim/model";

export interface InputHandlerContract {
	handle(ev: SimInputEvent): boolean;
}

export interface OutputHandlerContract {
	handle(ev: SimOutputEvent): boolean;
}

export type InOutHandlerDeps = Pick<SimulationCtx, "getItem"> & {
	genTracker: GenerationTrackerContract;
};
