import { PinUpdate, Tick } from "@sim/model";

export const simEvents = {
    PinUpdate: "SIMULATION.PIN_UPDATE",
    TickExecuted: "SIMULATION.TICK_EXECUTED",
    SimulationFinished: "SIMULATION.FINISHED",
} as const;

export type SimEventName = (typeof simEvents)[keyof typeof simEvents];

export type SimEventPayloads = {
    [simEvents.PinUpdate]: PinUpdate;
    [simEvents.TickExecuted]: Tick;
    [simEvents.SimulationFinished]: {};
};
