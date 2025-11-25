import { getByPath } from "@cnbn/utils";
export class WorkerHandler {
    constructor(_engine) {
        this._engine = _engine;
    }
    listen() {
        onmessage = (e) => {
            const { path, payload } = e.data;
            const request = e.data;
            try {
                const fn = getByPath(this._engine.api, path);
                if (!fn || typeof fn !== "function")
                    throw new Error(`Unknown API path: ${path}`);
                const result = fn(payload);
                const responce = {
                    ok: true,
                    request,
                    result,
                };
                postMessage(responce);
            }
            catch (error) {
                const responce = {
                    ok: false,
                    request,
                    error,
                };
                postMessage(responce);
            }
        };
    }
}
