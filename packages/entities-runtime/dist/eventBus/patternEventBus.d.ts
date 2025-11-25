import { Keys } from "@cnbn/schema";
import { ScopedEventBus } from "./scopedEventBus";
import { Listener, EventPayloadPair, ExtractSubMapByPatterns } from "./types";
export declare class EventBus<EvMap extends Record<string, any>> {
    private readonly _listeners;
    on<P extends string>(pattern: P, callback: Listener<EventPayloadPair<EvMap, P>>): () => void;
    once<P extends string>(pattern: P, callback: Listener<EventPayloadPair<EvMap, P>>): () => void;
    off<P extends string>(pattern: P, callback: Listener<EventPayloadPair<EvMap, P>>): void;
    emit<K extends Keys<EvMap>>(event: K, payload: EvMap[K]): void;
    narrow<const P extends readonly string[]>(allowedPatterns: P): ScopedEventBus<ExtractSubMapByPatterns<EvMap, P>>;
    clear(): void;
}
//# sourceMappingURL=patternEventBus.d.ts.map