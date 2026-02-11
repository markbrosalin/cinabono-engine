import { getByPath } from "@cnbn/utils";
export class CinabonoWorker {
    constructor(_engine) {
        this._engine = _engine;
        this._eventHandlers = new Map();
    }
    listen() {
        onmessage = (e) => {
            const { type } = e.data;
            switch (type) {
                case "request_api":
                    this._requestApi(e.data);
                    break;
                case "subscribe_event":
                    this.addEvent(e.data);
                    break;
                case "unsubscribe_event":
                    this.removeEvent(e.data);
                    break;
            }
        };
        this._emitReady();
    }
    _requestApi(request) {
        const { command, payload } = request;
        try {
            const fn = getByPath(this._engine.api, command);
            if (!fn || typeof fn !== "function")
                throw new Error(`Unknown API path: ${command}`);
            const result = fn(payload);
            const response = {
                ok: true,
                request,
                timestamp: Date.now(),
                result,
                type: "response_api",
            };
            postMessage(response);
        }
        catch (error) {
            const responce = {
                ok: false,
                request,
                timestamp: Date.now(),
                error,
                type: "response_api",
            };
            postMessage(responce);
        }
    }
    addEvent(event) {
        if (this._eventHandlers.has(event.pattern))
            return;
        const callback = this.mkCallback();
        this._eventHandlers.set(event.pattern, callback);
        this._engine.deps.core.bus.on(event.pattern, callback);
    }
    removeEvent(event) {
        const callback = this._eventHandlers.get(event.pattern);
        if (!callback)
            return;
        this._engine.deps.core.bus.off(event.pattern, callback);
        this._eventHandlers.delete(event.pattern);
    }
    mkCallback() {
        const callback = ({ event, payload, }) => {
            postMessage({
                event,
                payload,
                timestamp: Date.now(),
                type: "response_event",
            });
        };
        return callback;
    }
    _emitReady() {
        postMessage({
            type: "response_event",
            event: "workerEngine.ready",
            timestamp: Date.now(),
            payload: true,
        });
    }
}
