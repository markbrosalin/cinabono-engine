// import { EventName } from "../constants/events";
import { AnyEventCallback, EventCallback, EventMapBase } from "./callback.types";
// import { EventPayloads } from "./eventPayloads";

/**
 * @param E - Event type
 * @param C - Callbacks map
 */
// export interface EventBusContract {
//     on<E extends EventName>(event: E, callback: EventCallback<E>): () => void;
//     on(event: "*", callback: AnyEventCallback): () => void;
//     on(event: EventName | "*", callback: EventCallback<EventName> | AnyEventCallback): () => void;

//     off<E extends EventName>(event: E, callback: EventCallback<E>): void;
//     off(event: "*", callback: AnyEventCallback): void;
//     off(event: EventName | "*", callback: EventCallback<EventName> | AnyEventCallback): void;

//     emitAsync<E extends EventName>(event: E, payload?: EventPayloads[E]): Promise<void>;
//     emitSync<E extends EventName>(event: E, payload?: EventPayloads[E]): void;

//     clear: () => void;
// }

export interface EventBusContract<EvMap extends EventMapBase> {
    on<K extends keyof EvMap>(event: K, callback: EventCallback<EvMap, K>): () => void;
    on(event: "*", callback: AnyEventCallback<EvMap>): () => void;
    on(
        event: keyof EvMap | "*",
        callback: EventCallback<EvMap, keyof EvMap> | AnyEventCallback<EvMap>
    ): () => void;

    off<K extends keyof EvMap>(event: K, callback: EventCallback<EvMap, K>): void;
    off(event: "*", callback: AnyEventCallback<EvMap>): void;
    off(
        event: keyof EvMap | "*",
        callback: EventCallback<EvMap, keyof EvMap> | AnyEventCallback<EvMap>
    ): void;

    emitAsync<K extends keyof EvMap>(event: K, payload: EvMap[K]): Promise<void>;
    emitSync<K extends keyof EvMap>(event: K, payload: EvMap[K]): void;

    clear: () => void;
}
