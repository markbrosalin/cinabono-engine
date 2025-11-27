import { Keys } from "@cnbn/schema";
import { EventBus } from "./patternEventBus.js";
import { Listener, EventPayloadPair } from "./types/index.js";
export declare class ScopedEventBus<SubMap extends Record<string, any>> {
    private readonly _parent;
    private readonly _allowedPatterns;
    constructor(_parent: EventBus<any>, _allowedPatterns: Set<string>);
    on<P extends string>(pattern: P, callback: Listener<EventPayloadPair<SubMap, P>>): () => void;
    once<P extends string>(pattern: P, callback: Listener<EventPayloadPair<SubMap, P>>): () => void;
    emit<K extends Keys<SubMap>>(event: K, payload: SubMap[K]): void;
    off<P extends string>(pattern: P, callback: Listener<EventPayloadPair<SubMap, P>>): void;
    private _isAllowedPattern;
}
//# sourceMappingURL=scopedEventBus.d.ts.map