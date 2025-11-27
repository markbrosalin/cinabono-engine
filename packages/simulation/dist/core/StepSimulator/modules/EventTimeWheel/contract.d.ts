import { Tick, ScheduleInputParams, ScheduleOutputParams, SimEvent, SimInputEvent, SimOutputEvent } from "../../../../model/SimulatorStep.types.js";
export interface EventTimeWheelContract {
    getNow(): Tick;
    schedule(event: ScheduleInputParams): SimInputEvent;
    schedule(event: ScheduleOutputParams): SimOutputEvent;
    advance(): void;
    popCurrentMinDelta(): SimEvent[];
    hasReadyInCurrentSlot(): boolean;
    reset(): void;
    get size(): number;
}
//# sourceMappingURL=contract.d.ts.map