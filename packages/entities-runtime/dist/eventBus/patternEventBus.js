import { matchPattern } from "./helpers.js";
import { ScopedEventBus } from "./scopedEventBus.js";
export class EventBus {
    constructor() {
        this._listeners = new Map();
    }
    on(pattern, callback) {
        if (!this._listeners.has(pattern))
            this._listeners.set(pattern, new Set());
        this._listeners.get(pattern).add(callback);
        return () => this.off(pattern, callback);
    }
    once(pattern, callback) {
        const off = this.on(pattern, (pair) => {
            off();
            callback(pair);
        });
        return off;
    }
    off(pattern, callback) {
        const set = this._listeners.get(pattern);
        if (!set)
            return;
        set.delete(callback);
        if (set.size === 0)
            this._listeners.delete(pattern);
    }
    emit(event, payload) {
        if (this._listeners.size === 0)
            return;
        for (const [pattern, cbs] of this._listeners) {
            if (matchPattern(event, pattern)) {
                for (const cb of cbs)
                    cb({ event, payload });
            }
        }
    }
    narrow(allowedPatterns) {
        const allowed = new Set(allowedPatterns);
        return new ScopedEventBus(this, allowed);
    }
    clear() {
        this._listeners.clear();
    }
}
