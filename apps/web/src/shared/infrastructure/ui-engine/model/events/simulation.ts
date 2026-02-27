import type { PinUpdate } from "../types";

export const SIMULATION_BATCH_APPLIED_EVENT = "simulation:batch-applied";

export type SimulationBatchAppliedEvent = {
    updates: PinUpdate[];
};
