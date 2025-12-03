/* eslint-disable @typescript-eslint/no-explicit-any */
import { Keys } from "@cnbn/schema/primitives";
import { MatchesPattern } from "./utils";

export type Listener<E> = (pair: E) => void;

/**
 * Builds a { event, payload } pair type for a specific pattern.
 * @example EventPayloadPair<ApiEventMap, "core.useCase.*">
 * @returns union of pairs
 */
export type EventPayloadPair<EvMap, Pattern extends string> = {
    [K in Keys<EvMap>]: K extends string
        ? MatchesPattern<K, Pattern> extends true
            ? { event: K; payload: EvMap[K] }
            : never
        : never;
}[Keys<EvMap>];

export type EventPhase = "start" | "error" | "finish";

export type EventPatternFor<Prefix extends string, T extends string> = {
    start: `${Prefix}.${T}.start`;
    finish: `${Prefix}.${T}.finish`;
    error: `${Prefix}.${T}.error`;
    anyPhase: `${Prefix}.${T}.*`;
};

export type DefaultPhasePayloads = {
    start: { payload?: unknown };
    finish: { result?: unknown };
    error: { error: unknown };
};

type ExtendPhases = Partial<{
    [P in EventPhase]: Record<string, any>;
}>;

export type EventConfig<
    Config extends {
        base: Record<string, any>;
        extendPhases?: ExtendPhases;
    },
> = Config;

// export type EventConfig<Base, Start = {}, Finish = {}, Error = {}> = {
//     base: Base;
//     extendPhases?: {
//         start?: Start;
//         finish?: Finish;
//         error?: Error;
//     };
// };
