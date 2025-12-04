import { getByPath } from "@cnbn/utils";
export class WorkerHandler {
    constructor(_engine) {
        this._engine = _engine;
    }
    listen() {
        onmessage = (e) => {
            const { command, payload } = e.data;
            const request = e.data;
            try {
                const fn = getByPath(this._engine.api, command);
                if (!fn || typeof fn !== "function")
                    throw new Error(`Unknown API path: ${command}`);
                const result = fn(payload);
                const response = {
                    ok: true,
                    request,
                    timestamp: performance.now(),
                    result,
                    type: "response_api",
                };
                postMessage(response);
            }
            catch (error) {
                const responce = {
                    ok: false,
                    request,
                    timestamp: performance.now(),
                    error,
                    type: "response_api",
                };
                postMessage(responce);
            }
        };
    }
}
