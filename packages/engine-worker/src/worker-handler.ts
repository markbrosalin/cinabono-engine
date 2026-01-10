import { CinabonoEngine, IEngineEvents } from "@cnbn/engine";
import {
    EmitEventMessage,
    RequestMessage,
    ResponseMessage,
    SubEventMessage,
    UnsubEventMessage,
    WorkerMessage,
} from "./types";
import { getByPath } from "@cnbn/utils";
import { EventPayloadPair, Listener } from "@cnbn/entities-runtime";

export class WorkerHandler {
    constructor(private readonly _engine: CinabonoEngine) {}

    public listen(): void {
        onmessage = (e: MessageEvent<WorkerMessage>) => {
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

    private _requestApi(request: RequestMessage) {
        const { command, payload } = request;

        try {
            const fn = getByPath(this._engine.api, command);
            if (!fn || typeof fn !== "function") throw new Error(`Unknown API path: ${command}`);

            const result = fn(payload);

            const response: ResponseMessage = {
                ok: true,
                request,
                timestamp: Date.now(),
                result,
                type: "response_api",
            };

            postMessage(response);
        } catch (error) {
            const responce: ResponseMessage = {
                ok: false,
                request,
                timestamp: Date.now(),
                error,
                type: "response_api",
            };

            postMessage(responce);
        }
    }

    private addEvent(event: SubEventMessage) {
        const callback = this.mkCallback();

        this._engine.deps.core.bus.on(event.pattern, callback);
    }

    private removeEvent(event: UnsubEventMessage) {
        const callback = this.mkCallback();

        this._engine.deps.core.bus.off(event.pattern, callback);
    }

    private mkCallback() {
        const callback: Listener<EventPayloadPair<IEngineEvents, string>> = ({
            event,
            payload,
        }) => {
            postMessage({
                event,
                payload,
                timestamp: Date.now(),
                type: "response_event",
            } satisfies EmitEventMessage);
        };

        return callback;
    }

    private _emitReady() {
        postMessage({
            type: "response_event",
            event: "workerEngine.ready",
            timestamp: Date.now(),
            payload: { ready: true },
        } satisfies EmitEventMessage<"workerEngine.ready">);
    }
}
