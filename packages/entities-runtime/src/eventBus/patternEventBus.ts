/* eslint-disable @typescript-eslint/no-explicit-any */
import { Keys } from "@cnbn/schema";
import { ScopedEventBus } from "./scopedEventBus";
import { Listener, EventPayloadPair, ExtractSubMapByPatterns } from "./types";
import picomatch from "picomatch";

export class EventBus<EvMap extends Record<string, any>> {
    private readonly _listeners = new Map<string, Set<Listener<unknown>>>();

    public on<P extends string>(
        pattern: P,
        callback: Listener<EventPayloadPair<EvMap, P>>
    ): () => void {
        if (!this._listeners.has(pattern)) this._listeners.set(pattern, new Set());
        this._listeners.get(pattern)!.add(callback as Listener<unknown>);
        return () => this.off(pattern, callback);
    }

    public once<P extends string>(
        pattern: P,
        callback: Listener<EventPayloadPair<EvMap, P>>
    ): () => void {
        const off = this.on(pattern, (pair) => {
            off();
            callback(pair);
        });
        return off;
    }

    public off<P extends string>(pattern: P, callback: Listener<EventPayloadPair<EvMap, P>>): void {
        const set = this._listeners.get(pattern);
        if (!set) return;
        set.delete(callback as Listener<unknown>);
        if (!set.size) this._listeners.delete(pattern);
    }

    public emit<K extends Keys<EvMap>>(event: K, payload: EvMap[K]): void {
        if (!this._listeners.size) return;

        for (const [pattern, cbs] of this._listeners) {
            if (picomatch.isMatch(event, pattern)) {
                for (const cb of cbs) cb({ event, payload });
            }
        }
    }

    public narrow<const P extends readonly string[]>(allowedPatterns: P) {
        const allowed = new Set(allowedPatterns);
        return new ScopedEventBus<ExtractSubMapByPatterns<EvMap, P>>(this, allowed);
    }

    public clear(): void {
        this._listeners.clear();
    }
}
