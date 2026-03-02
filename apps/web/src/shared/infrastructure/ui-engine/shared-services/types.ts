import type {
    UIEngineEventListener,
    UIEngineEventMap,
    UIEngineEventName,
} from "../model/events";

export type EventBusServiceContract = {
    emit: <K extends UIEngineEventName>(name: K, event: UIEngineEventMap[K]) => void;
    on: <K extends UIEngineEventName>(name: K, listener: UIEngineEventListener<K>) => () => void;
    once: <K extends UIEngineEventName>(name: K, listener: UIEngineEventListener<K>) => () => void;
    off: <K extends UIEngineEventName>(name: K, listener: UIEngineEventListener<K>) => void;
};

export type UIEngineSharedServices = {
    eventBus: EventBusServiceContract;
};

export type UIEngineSharedServiceName = keyof UIEngineSharedServices;

export type UIEngineSharedServiceGetter = <K extends UIEngineSharedServiceName>(
    name: K,
) => UIEngineSharedServices[K];
