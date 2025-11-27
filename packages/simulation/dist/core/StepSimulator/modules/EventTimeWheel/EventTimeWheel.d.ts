import { ScheduleInputParams, ScheduleOutputParams, SimEvent, SimInputEvent, SimOutputEvent, Tick } from "../../../../model/SimulatorStep.types.js";
import { EventTimeWheelContract } from "./contract.js";
export declare class DefaultEventTimeWheel implements EventTimeWheelContract {
    private readonly _W;
    private _now;
    private _cursor;
    private _globalSeq;
    private _currentDelta;
    private _buckets;
    private readonly _pending;
    private _size;
    constructor(W: number);
    get size(): number;
    getNow(): Tick;
    schedule(event: ScheduleInputParams): SimInputEvent;
    schedule(event: ScheduleOutputParams): SimOutputEvent;
    advance(): void;
    popCurrentMinDelta(): SimEvent[];
    hasReadyInCurrentSlot(): boolean;
    reset(): void;
    private _findMinDelta;
    private _drainWave;
    private _idx;
    private _bucketKey;
    private _pendingKey;
}
//# sourceMappingURL=EventTimeWheel.d.ts.map