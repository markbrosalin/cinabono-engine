import { buildServiceRegistry, type ServiceDefinition } from "../lib/registry/buildServiceRegistry";
import type { UIEngineEventListener, UIEngineEventMap, UIEngineEventName } from "../model/events";
import type {
    EventBusServiceContract,
    UIEngineSharedServiceName,
    UIEngineSharedServices,
} from "./types";

type AnyListener = (event: unknown) => void;

export const createEventBus = (): EventBusServiceContract => {
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

const sharedServiceDefinitions: {
    [K in UIEngineSharedServiceName]: ServiceDefinition<UIEngineSharedServiceName, UIEngineSharedServices[K]>;
} = {
    eventBus: {
        create: createEventBus,
    },
};

export const buildSharedServices = () => {
    return buildServiceRegistry<UIEngineSharedServiceName, UIEngineSharedServices>(
        sharedServiceDefinitions,
        { label: "shared service" },
    );
};

export type {
    EventBusServiceContract,
    UIEngineSharedServiceGetter,
    UIEngineSharedServiceName,
    UIEngineSharedServices,
} from "./types";
