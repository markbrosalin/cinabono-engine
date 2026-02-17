import type { SimulationMode } from "./contracts";

export const SIMULATION_MODE_OPTIONS: Array<{ value: SimulationMode; label: string }> = [
    { value: "framerate", label: "framerate" },
];

export const getDelayMode = (_mode: SimulationMode): "raf" => "raf";
