/* eslint-disable @typescript-eslint/no-explicit-any */
import { Keys, UnionToIntersection } from "@cnbn/schema";
import { EventBus } from "../patternEventBus";
import { ScopedEventBus } from "../scopedEventBus";
import { EventPhase, DefaultPhasePayloads, EventConfig } from "./types";

/**
 * Checks if a given key matches at least one pattern from the provided list
 * @example KeyMatchesAnyPattern<"core.step.start", ["core.step.*", "core.rollback.*"]> --> true
 * @returns boolean
 */
type KeyMatchesAnyPattern<
    Key extends string,
    Patterns extends readonly string[],
> = Patterns extends readonly [infer P extends string, ...infer Rest extends readonly string[]]
    ? MatchesPattern<Key, P> extends true
        ? true
        : KeyMatchesAnyPattern<Key, Rest>
    : false;

/**
 * Extracts a subset of events from EvMap that match any of the given patterns.
 * @example ExtractSubMapByPatterns<EngineEventMap, ["core.step.*"]>
 * @returns only pattern-related events
 */
export type ExtractSubMapByPatterns<EvMap, Patterns extends readonly string[]> = {
    [K in Keys<EvMap> as K extends string
        ? KeyMatchesAnyPattern<K, Patterns> extends true
            ? K
            : never
        : never]: EvMap[K];
};

/**
 * Splits a string by '.' into a readonly tuple.
 * @example SplitEvent<"core.step.start"> --> ["core", "step", "start"]
 * @returns readonly tuple
 */
export type SplitEvent<S extends string> = S extends `${infer A}.${infer B}`
    ? readonly [A, ...SplitEvent<B>]
    : readonly [S];

/**
 * Check if an event name matches a pattern with wildcards ("*").
 * @example MatchesPattern<"core.step.start", "core.step.*"> --> true
 * @returns boolean
 */
export type MatchesPattern<Event extends string, Pattern extends string> = CompareSegments<
    SplitEvent<Event>,
    SplitEvent<Pattern>
>;

/**
 * Compares two string segment arrays to determine pattern match.
 * Supports "*" wildcard that matches any single segment.
 * @returns boolean
 */
type CompareSegments<
    E extends readonly string[],
    P extends readonly string[],
> = P extends readonly [infer PH extends string, ...infer PT extends readonly string[]]
    ? E extends readonly [infer EH extends string, ...infer ET extends readonly string[]]
        ? PH extends "*"
            ? CompareSegments<ET, PT> // satisfies any segment
            : EH extends PH
              ? CompareSegments<ET, PT>
              : false
        : false
    : E["length"] extends 0
      ? true
      : false;

/**
 *  @returns type of narrowed event bus
 */
export type NarrowReturn<EvMap extends Record<string, any>, Patterns extends readonly string[]> =
    ReturnType<EventBus<EvMap>["narrow"]> extends ScopedEventBus<infer _>
        ? ScopedEventBus<ExtractSubMapByPatterns<EvMap, Patterns>>
        : never;

/**
 * @returns flat object of events extended with payload of each phase
 * @key event name
 * @value event payload
 */
export type CreateEventMap<
    Prefix extends string,
    Config extends Record<string, EventConfig<any>>,
> = UnionToIntersection<
    {
        [Type in keyof Config]: {
            [P in EventPhase]: Record<
                `${Prefix}.${Type & string}.${P}`,
                Config[Type]["base"] &
                    DefaultPhasePayloads[P] &
                    (P extends keyof Config[Type]["extendPhases"]
                        ? Config[Type]["extendPhases"][P]
                        : {})
            >;
        }[EventPhase];
    }[keyof Config]
>;
