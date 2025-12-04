import { PublicApiByPath } from "@cnbn/engine";
import { EventBus } from "@cnbn/entities-runtime";
import { PayloadOf, ResultOf } from "@cnbn/schema";
import { IEngineWorkerEvents } from "./events.js";
export declare class WorkerClient<EvMap extends IEngineWorkerEvents = IEngineWorkerEvents> {
    protected readonly worker: Worker;
    readonly bus: EventBus<EvMap>;
    private _id;
    private _pendingRpc;
    constructor(worker: Worker, bus?: EventBus<EvMap>);
    isReady(): Promise<unknown>;
    call<P extends keyof PublicApiByPath>(command: P, ...payload: PayloadOf<PublicApiByPath[P]>): Promise<ResultOf<PublicApiByPath[P]>>;
    private _handleRpc;
    private _getNextId;
}
//# sourceMappingURL=worker-client.d.ts.map