import {
    EventBusContract,
    EventName,
    EventPayloads,
    EventCallback,
    AnyEventCallback,
} from "@gately/domain-model/shared/event-bus";
import { batchProcess } from "@repo/utils";

interface EventBusOptions {
    listeners?: Map<EventName, Set<EventCallback<EventName>>>;
    globalListeners?: Set<AnyEventCallback>;
}

export class EventBus implements EventBusContract {
    private readonly _listeners: Map<EventName, Set<EventCallback<EventName>>>;
    private readonly _globalListeners: Set<AnyEventCallback>;

    constructor({ listeners = new Map(), globalListeners = new Set() }: EventBusOptions = {}) {
        this._listeners = listeners;
        this._globalListeners = globalListeners;
    }

    public on<E extends EventName>(event: E, callback: EventCallback<E>): () => void;

    public on(event: "*", callback: AnyEventCallback): () => void;

    public on(
        event: EventName | "*",
        callback: EventCallback<EventName> | AnyEventCallback
    ): () => void {
        if (event === "*") {
            this._globalListeners.add(callback as AnyEventCallback);
            return () => this._globalListeners.delete(callback as AnyEventCallback);
        }

        if (!this._listeners.has(event)) {
            this._listeners.set(event, new Set());
        }
        this._listeners.get(event)!.add(callback as EventCallback<typeof event>);
        return () => this.off(event, callback as EventCallback<typeof event>);
    }

    public off<E extends EventName>(event: E, callback: EventCallback<E>): void;

    public off(event: "*", callback: AnyEventCallback): void;

    public off(
        event: EventName | "*",
        callback: EventCallback<EventName> | AnyEventCallback
    ): void {
        if (event === "*") {
            this._globalListeners.delete(callback as AnyEventCallback);
            return;
        }

        const callbacks = this._listeners.get(event);
        if (!callbacks) return;

        callbacks.delete(callback as EventCallback<typeof event>);
        if (callbacks.size === 0) {
            this._listeners.delete(event);
        }
    }

    public async emit<E extends EventName>(event: E, payload?: EventPayloads[E]): Promise<void> {
        await batchProcess({
            items: this._globalListeners,
            processItem: (cb) => cb(event, (payload ?? {}) as EventPayloads[E]),
        });

        await batchProcess({
            items: this._listeners.get(event),
            processItem: (cb) => cb((payload ?? {}) as EventPayloads[E]),
        });
    }

    public clear(): void {
        this._listeners.clear();
        this._globalListeners.clear();
    }
}
