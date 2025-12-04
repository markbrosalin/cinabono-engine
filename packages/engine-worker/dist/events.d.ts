import { CreateEventMap, EventConfig } from "@cnbn/entities-runtime/eventBus";
import { RequestMessage, ResponseMessage } from "./types";
import { IEngineEvents } from "@cnbn/engine";
export interface IWorkerSpecificEvents extends CreateEventMap<"workerEngine", {
    rpc: EventConfig<{
        base: {};
        extendPhases: {
            start: RequestMessage;
            finish: {
                duration: number;
            } & Extract<ResponseMessage, {
                ok: true;
            }>;
            error: {
                duration: number;
            } & Extract<ResponseMessage, {
                ok: false;
            }>;
        };
    }>;
}> {
    "workerEngine.ready": {
        timestamp: number;
    };
}
export interface IEngineWorkerEvents extends IEngineEvents, IWorkerSpecificEvents {
}
//# sourceMappingURL=events.d.ts.map