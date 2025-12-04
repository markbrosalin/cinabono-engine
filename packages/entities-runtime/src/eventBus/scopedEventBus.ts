/* eslint-disable @typescript-eslint/no-explicit-any */
import { Keys } from "@cnbn/schema";
import { matchPattern } from "./helpers";
import { EventBus } from "./patternEventBus";
import { Listener, EventPayloadPair } from "./types";

export class ScopedEventBus<SubMap extends Record<string, any>> {
    constructor(
        private readonly _parent: EventBus<any>,
        private readonly _allowedPatterns: Set<string>
    ) {}

    public on<P extends string>(
        pattern: P,
        callback: Listener<EventPayloadPair<SubMap, P>>
    ): () => void {
        if (!this._isAllowedPattern(pattern)) {
            throw new Error(`Pattern "${pattern}" not allowed in this scope`);
        }
        return this._parent.on(pattern, callback as Listener<unknown>);
    }

    public once<P extends string>(
        pattern: P,
        callback: Listener<EventPayloadPair<SubMap, P>>
    ): () => void {
        if (!this._isAllowedPattern(pattern)) {
            throw new Error(`Pattern "${pattern}" is not allowed in this scope`);
        }
        return this._parent.once(pattern, callback as Listener<unknown>);
    }

    public emit<K extends Keys<SubMap>>(event: K, payload: SubMap[K]): void {
        if (!this._isAllowedPattern(event)) {
            throw new Error(`Event "${event}" is not allowed in this scope`);
        }
        this._parent.emit(event, payload);
    }

    public off<P extends string>(
        pattern: P,
        callback: Listener<EventPayloadPair<SubMap, P>>
    ): void {
        if (!this._isAllowedPattern(pattern)) {
            throw new Error(`Pattern "${pattern}" is not allowed in this scope`);
        }
        this._parent.off(pattern, callback as Listener<unknown>);
    }

    private _isAllowedPattern(pattern: string): boolean {
        for (const allowedPattern of this._allowedPatterns) {
            if (matchPattern(pattern, allowedPattern)) return true;
        }
        return false;
    }
}
