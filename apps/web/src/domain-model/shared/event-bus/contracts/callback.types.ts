import { EventName } from "../constants/events";
import { EventPayloads } from "./eventPayloads";

// export type EventCallback<E extends EventName> = (payload: EventPayloads[E]) => void;
// export type AnyEventCallback = <E extends EventName>(event: E, payload: EventPayloads[E]) => void;

// export type EventCallbackMap = {
//     [E in EventName]: EventCallback<E>[];
// } & {
//     "*": AnyEventCallback[];
// };

export type EventMapBase = Record<string, unknown>;

export type EventCallback<EvMap extends EventMapBase, K extends keyof EvMap> = (
    payload: EvMap[K]
) => void;

export type AnyEventCallback<EvMap extends EventMapBase> = <K extends keyof EvMap>(
    event: K,
    payload: EvMap[K]
) => void;

export type EventCallbackMap<EvMap extends EventMapBase> = {
    [K in keyof EvMap]: EventCallback<EvMap, K>[];
} & {
    "*": AnyEventCallback<EvMap>[];
};
