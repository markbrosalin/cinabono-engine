import type { Graph } from "@antv/x6";
import type { UIEngineContext } from "../../model/types";
import type { UIEngineEventListener, UIEngineEventMap, UIEngineEventName } from "../../model/events";
import type {
    EventBusServiceContract,
} from "./types";

type AnyListener = (event: unknown) => void;

export const useEventBusService = (
    _graph: Graph,
    _ctx: UIEngineContext,
): EventBusServiceContract => {
    const listeners = new Map<UIEngineEventName, Set<AnyListener>>();

    const on = <K extends UIEngineEventName>(
        name: K,
        listener: UIEngineEventListener<K>,
    ): (() => void) => {
        const existing = listeners.get(name);
        const set = existing ?? new Set<AnyListener>();
        set.add(listener as AnyListener);

        if (!existing) {
            listeners.set(name, set);
        }

        return () => {
            off(name, listener);
        };
    };

    const once = <K extends UIEngineEventName>(
        name: K,
        listener: UIEngineEventListener<K>,
    ): (() => void) => {
        const off_fn = on(name, (event) => {
            off_fn();
            listener(event);
        });

        return off_fn;
    };

    const off = <K extends UIEngineEventName>(
        name: K,
        listener: UIEngineEventListener<K>,
    ): void => {
        const set = listeners.get(name);
        if (!set) return;

        set.delete(listener as AnyListener);
        if (!set.size) {
            listeners.delete(name);
        }
    };

    const emit = <K extends UIEngineEventName>(name: K, event: UIEngineEventMap[K]): void => {
        const set = listeners.get(name);
        if (!set) return;

        set.forEach((listener) => {
            (listener as UIEngineEventListener<K>)(event);
        });
    };

    return {
        emit,
        on,
        off,
        once,
    };
};

export type EventBusService = ReturnType<typeof useEventBusService>;
