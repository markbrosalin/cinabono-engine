import type { SimulationBatchAppliedEvent } from "./simulation";
import { SIMULATION_BATCH_APPLIED_EVENT } from "./simulation";

export type UIEngineEventMap = {
    [SIMULATION_BATCH_APPLIED_EVENT]: SimulationBatchAppliedEvent;
};

export type UIEngineEventName = keyof UIEngineEventMap;

export type UIEngineEventListener<K extends UIEngineEventName> = (
    event: UIEngineEventMap[K],
) => void;
