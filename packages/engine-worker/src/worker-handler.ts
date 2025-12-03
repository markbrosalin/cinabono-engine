import { CinabonoEngine } from "@cnbn/engine";
import { RequestMessage, ResponseMessage } from "./types";
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

                const responce: ResponseMessage = {
                    ok: true,
                    request,
                    result,
                };

                postMessage(responce);
            } catch (error) {
                const responce: ResponseMessage = {
                    ok: false,
                    request,
                    error,
                };

                postMessage(responce);
            }
        };
    }
}
