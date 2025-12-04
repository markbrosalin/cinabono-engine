import { CinabonoEngine } from "@cnbn/engine";
import { RequestMessage, ResponseMessage, WorkerEventMessage } from "./types";
import { getByPath } from "@cnbn/utils";

export class WorkerHandler {
    constructor(private readonly _engine: CinabonoEngine) {}

    public listen(): void {
        onmessage = (e: MessageEvent<RequestMessage>) => {
            const { command, payload } = e.data;
            const request = e.data;

            try {
                const fn = getByPath(this._engine.api, command);
                if (!fn || typeof fn !== "function")
                    throw new Error(`Unknown API path: ${command}`);

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
        };

        postMessage({
            type: "worker_event",
            name: "workerEngine.ready",
            timestamp: Date.now(),
            payload: { ready: true },
        } satisfies WorkerEventMessage<"workerEngine.ready">);
    }
}
