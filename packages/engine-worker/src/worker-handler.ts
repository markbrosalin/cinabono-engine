import { CinabonoEngine } from "@cnbn/engine";
import { RpcRequest, RpcResponse } from "./types";
import { getByPath } from "@cnbn/utils";

export class WorkerHandler {
    constructor(private readonly _engine: CinabonoEngine) {}

    public listen(): void {
        onmessage = (e: MessageEvent<RpcRequest>) => {
            const { path, payload } = e.data;
            const request = e.data;

            try {
                const fn = getByPath(this._engine.api, path);
                if (!fn || typeof fn !== "function") throw new Error(`Unknown API path: ${path}`);

                const result = fn(payload);

                const responce: RpcResponse = {
                    ok: true,
                    request,
                    result,
                };

                postMessage(responce);
            } catch (error) {
                const responce: RpcResponse = {
                    ok: false,
                    request,
                    error,
                };

                postMessage(responce);
            }
        };
    }
}
