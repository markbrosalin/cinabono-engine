/* eslint-disable @typescript-eslint/no-explicit-any */
import { PublicApiByPath } from "@cnbn/engine";
import { EventBus } from "@cnbn/entities-runtime";
import { PayloadOf, ResultOf } from "@cnbn/schema";
import {
    PendingResponce,
    RequestMessage,
    RpcPendingId,
    WorkerMessage,
    WorkerMessageMap,
} from "@worker/types";

export class WorkerClient<EvMap extends Record<string, any>> {
    private _id = 0;
    private _pendingRpc = new Map<RpcPendingId, PendingResponce>();

    constructor(
        protected readonly worker: Worker,
        public readonly bus?: EventBus<EvMap>
    ) {
        worker.onmessage = (e: MessageEvent<WorkerMessage>) => {
            const msg = e.data;

            switch (msg.type) {
                case "response_api":
                    this._handleRpc(msg);
                    break;
                case "engine_event":
                    this.bus?.emit(`engine.${msg.name}`, msg.payload);
                    break;
                case "worker_event":
                    this.bus?.emit(`worker.${msg.name}`, msg.payload);
                    break;
            }
        };
    }

    public async call<P extends keyof PublicApiByPath>(
        command: P,
        ...payload: PayloadOf<PublicApiByPath[P]>
    ): Promise<ResultOf<PublicApiByPath[P]>> {
        const requestId = this._getNextId(command);

        return new Promise((resolve, reject) => {
            this._pendingRpc.set(requestId, { resolve, reject });
            this.worker.postMessage({
                id: requestId,
                command,
                payload,
                timestamp: performance.now(),
                type: "request_api",
            } satisfies RequestMessage);
        });
    }

    private _handleRpc(response: WorkerMessageMap["response_api"]) {
        const { ok, request } = response;

        const p = this._pendingRpc.get(request.id);
        if (!p) return;

        this._pendingRpc.delete(request.id);

        if (ok) p.resolve(response.result);
        else p.reject(response);
    }

    private _getNextId(command: string): RpcPendingId {
        return `${command}-${this._id++}`;
    }
}

const client = new WorkerClient({} as any);
