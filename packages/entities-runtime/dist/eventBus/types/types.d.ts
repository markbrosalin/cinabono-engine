import { Keys } from "@cnbn/schema/primitives";
import { MatchesPattern } from "./utils";
export type Listener<E> = (pair: E) => void;
/**
 * Builds a {event, payload } pair type for a specific pattern.
 * @example EventPayloadPair<ApiEventMap, "core.useCase.*">
 * @returns union of pairs
 */
export type EventPayloadPair<EvMap, Pattern extends string> = {
    [K in Keys<EvMap>]: K extends string ? MatchesPattern<K, Pattern> extends true ? {
        event: K;
        payload: EvMap[K];
    } : never : never;
}[Keys<EvMap>];
//# sourceMappingURL=types.d.ts.map