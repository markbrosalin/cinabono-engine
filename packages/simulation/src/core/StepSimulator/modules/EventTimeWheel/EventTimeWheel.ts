import { uniqueKeyByData } from "@cnbn/utils";
import {
    ScheduleInputParams,
    ScheduleOutputParams,
    SimEvent,
    SimInputEvent,
    SimOutputEvent,
    Tick,
} from "@sim/model/SimulatorStep.types";
import { EventTimeWheelContract } from "./contract";

export class DefaultEventTimeWheel implements EventTimeWheelContract {
    private readonly _W: number; //Num of buckets in one tick
    private _now: Tick = 0;
    private _cursor: number = 0;

    private _globalSeq: number = 0;
    private _currentDelta: number = 0;

    private _buckets: Map<string, SimEvent>[];
    private readonly _pending = new Map<string, SimEvent>();
    private _size = 0;

    constructor(W: number) {
        this._W = W;
        this._buckets = Array.from({ length: W }, () => new Map());
    }

    public get size(): number {
        return this._size;
    }

    public getNow(): Tick {
        return this._now;
    }

    public schedule(event: ScheduleInputParams): SimInputEvent;
    public schedule(event: ScheduleOutputParams): SimOutputEvent;
    public schedule(event: ScheduleInputParams | ScheduleOutputParams): SimEvent {
        let t = event.t ?? this.getNow();
        if (t < this._now) t = this._now;

        const isZeroDelay = t === this._now;
        const delta = isZeroDelay ? this._currentDelta + 1 : 0;
        const seq = ++this._globalSeq;

        const ev: SimEvent = { ...event, t, delta, seq };

        // last-write-wins
        const pendingKey = this._pendingKey(ev);
        const oldEvent = this._pending.get(pendingKey);

        if (oldEvent) {
            const oldBucketKey = this._bucketKey(oldEvent);
            this._buckets[this._idx(oldEvent.t)].delete(oldBucketKey);
        }

        const slot = this._idx(t);
        const bucketKey = this._bucketKey({ ...ev, delta });
        this._buckets[slot].set(bucketKey, ev);
        this._pending.set(pendingKey, ev);

        !oldEvent && this._size++;

        return ev;
    }

    public advance(): void {
        this._now++;
        this._cursor = ++this._cursor % this._W;
        this._currentDelta = 0;
    }

    public popCurrentMinDelta() {
        const slotMap = this._buckets[this._cursor];

        let events: SimEvent[] = [];
        const minDelta = this._findMinDelta(slotMap);

        if (minDelta == null) return events;

        events = this._drainWave(slotMap, minDelta);
        this._currentDelta = minDelta;
        return events;
    }

    public hasReadyInCurrentSlot(): boolean {
        const slotMap = this._buckets[this._cursor];

        for (const ev of slotMap.values()) {
            if (ev.t === this.getNow()) return true;
        }
        return false;
    }

    public reset(): void {
        this._now = 0;
        this._cursor = 0;

        this._globalSeq = 0;
        this._currentDelta = 0;

        this._buckets = Array.from({ length: this._W }, () => new Map());
        this._pending.clear();
        this._size = 0;
    }

    private _findMinDelta(slotMap: Map<string, SimEvent>): number | null {
        let min: number | null = null;
        for (const ev of slotMap.values()) {
            if (ev.t !== this.getNow()) continue;
            if (min === null || ev.delta < min) min = ev.delta;
        }
        return min;
    }

    private _drainWave(slotMap: Map<string, SimEvent>, minDelta: number): SimEvent[] {
        const batch: SimEvent[] = [];
        for (const [key, ev] of slotMap) {
            if (ev.t === this.getNow() && ev.delta === minDelta) {
                batch.push(ev);
                slotMap.delete(key);
                this._pending.delete(this._pendingKey(ev));
                this._size--;
            }
        }

        batch.sort((a, b) => a.seq - b.seq);
        return batch;
    }

    private _idx(t: Tick = this.getNow()) {
        return ((t % this._W) + this._W) % this._W; // Always positive result
    }

    private _bucketKey({
        kind,
        itemId,
        pin,
        delta,
    }: Pick<SimEvent, "kind" | "itemId" | "pin" | "delta">): string {
        return uniqueKeyByData(kind, itemId, pin, delta);
    }

    private _pendingKey({
        kind,
        itemId,
        pin,
        t,
        delta,
    }: Pick<SimEvent, "kind" | "itemId" | "pin" | "delta" | "t">): string {
        return uniqueKeyByData(kind, itemId, pin, t, delta);
    }
}
