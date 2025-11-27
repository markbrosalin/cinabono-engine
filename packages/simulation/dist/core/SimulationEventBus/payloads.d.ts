import { PinUpdate, Tick } from "../../model/index.js";
export declare const simEvents: {
    readonly PinUpdate: "SIMULATION.PIN_UPDATE";
    readonly TickExecuted: "SIMULATION.TICK_EXECUTED";
    readonly SimulationFinished: "SIMULATION.FINISHED";
};
export type SimEventName = (typeof simEvents)[keyof typeof simEvents];
export type SimEventPayloads = {
    [simEvents.PinUpdate]: PinUpdate;
    [simEvents.TickExecuted]: Tick;
    [simEvents.SimulationFinished]: {};
};
//# sourceMappingURL=payloads.d.ts.map