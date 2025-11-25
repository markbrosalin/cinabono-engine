import { uniqueKeyByData } from "@cnbn/utils";
export class DefaultEventTimeWheel {
    constructor(W) {
        this._now = 0;
        this._cursor = 0;
        this._globalSeq = 0;
        this._currentDelta = 0;
        this._pending = new Map();
        this._size = 0;
        this._W = W;
        this._buckets = Array.from({ length: W }, () => new Map());
    }
    get size() {
        return this._size;
    }
    getNow() {
        return this._now;
    }
    schedule(event) {
        let t = event.t ?? this.getNow();
        if (t < this._now)
            t = this._now;
        const isZeroDelay = t === this._now;
        const delta = isZeroDelay ? this._currentDelta + 1 : 0;
        const seq = ++this._globalSeq;
        const ev = { ...event, t, delta, seq };
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
    advance() {
        this._now++;
        this._cursor = ++this._cursor % this._W;
        this._currentDelta = 0;
    }
    popCurrentMinDelta() {
        const slotMap = this._buckets[this._cursor];
        let events = [];
        const minDelta = this._findMinDelta(slotMap);
        if (minDelta == null)
            return events;
        events = this._drainWave(slotMap, minDelta);
        this._currentDelta = minDelta;
        return events;
    }
    hasReadyInCurrentSlot() {
        const slotMap = this._buckets[this._cursor];
        for (const ev of slotMap.values()) {
            if (ev.t === this.getNow())
                return true;
        }
        return false;
    }
    reset() {
        this._now = 0;
        this._cursor = 0;
        this._globalSeq = 0;
        this._currentDelta = 0;
        this._buckets = Array.from({ length: this._W }, () => new Map());
        this._pending.clear();
        this._size = 0;
    }
    _findMinDelta(slotMap) {
        let min = null;
        for (const ev of slotMap.values()) {
            if (ev.t !== this.getNow())
                continue;
            if (min === null || ev.delta < min)
                min = ev.delta;
        }
        return min;
    }
    _drainWave(slotMap, minDelta) {
        const batch = [];
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
    _idx(t = this.getNow()) {
        return ((t % this._W) + this._W) % this._W; // Always positive result
    }
    _bucketKey({ kind, itemId, pin, delta, }) {
        return uniqueKeyByData(kind, itemId, pin, delta);
    }
    _pendingKey({ kind, itemId, pin, t, delta, }) {
        return uniqueKeyByData(kind, itemId, pin, t, delta);
    }
}
