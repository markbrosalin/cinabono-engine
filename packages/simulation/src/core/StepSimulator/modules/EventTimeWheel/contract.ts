import {
    Tick,
    ScheduleInputParams,
    ScheduleOutputParams,
    SimEvent,
    SimInputEvent,
    SimOutputEvent,
} from "@sim/model/SimulatorStep.types";

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
