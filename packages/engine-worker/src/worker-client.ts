/* eslint-disable @typescript-eslint/no-explicit-any */
import { PublicApiByPath } from "@cnbn/engine";
import { EventBus } from "@cnbn/entities-runtime";
import { PayloadOf, ResultOf } from "@cnbn/schema";
import { PendingResponce, RequestMessage, RpcPendingId, WorkerMessage } from "@worker/types";
import { IEngineWorkerEvents } from "./events";
import { EngineWorkerEvents } from "./patterns";

export class WorkerClient<EvMap extends IEngineWorkerEvents = IEngineWorkerEvents> {
    private _id = 0;
    private _pendingRpc = new Map<RpcPendingId, PendingResponce>();

    constructor(
        protected readonly worker: Worker,
        public readonly bus: EventBus<EvMap> = new EventBus()
    ) {
        worker.onmessage = (e: MessageEvent<WorkerMessage>) => {
            const msg = e.data;

            switch (msg.type) {
                case "response_api":
                    this._handleRpc(msg);
                    break;
                case "worker_event":
                    this.bus.emit(msg.name, msg as any);
                    break;
                case "engine_event":
                    this.bus.emit(msg.name, msg.payload as any);
                    break;
            }
        };
    }

    public async isReady() {
        return new Promise((resolve) => {
            this.bus.once("workerEngine.ready", ({ payload }) => resolve(payload));
        });
    }

    public async call<P extends keyof PublicApiByPath>(
        command: P,
        ...payload: PayloadOf<PublicApiByPath[P]>
    ): Promise<ResultOf<PublicApiByPath[P]>> {
        const requestId = this._getNextId(command);

        this.bus.emit(EngineWorkerEvents.workerEngine.rpc.start, {
            command,
            id: requestId,
            payload,
            timestamp: Date.now(),
            type: "request_api",
        });

        return new Promise((resolve, reject) => {
            this._pendingRpc.set(requestId, { resolve, reject });

            this.worker.postMessage({
                id: requestId,
                command,
                payload,
                timestamp: Date.now(),
                type: "request_api",
            } satisfies RequestMessage);
        });
    }

    private _handleRpc(response: Extract<WorkerMessage, { type: "response_api" }>) {
        const { ok, request } = response;

        const p = this._pendingRpc.get(request.id);
        if (!p) return;

        this._pendingRpc.delete(request.id);

        const duration = response.timestamp - request.timestamp;

        if (ok) {
            this.bus.emit(EngineWorkerEvents.workerEngine.rpc.finish, {
                ...response,
                duration,
            });

            p.resolve(response.result);
        } else {
            this.bus.emit(EngineWorkerEvents.workerEngine.rpc.error, {
                ...response,
                duration,
            });

            p.reject(response);
        }
    }

    private _getNextId(command: string): RpcPendingId {
        return `${command}-${this._id++}`;
    }
}
