import { CreateEventMap, EventConfig } from "@cnbn/entities-runtime/eventBus";
import { RequestMessage, ResponseMessage } from "./types";
import { IEngineEvents } from "@cnbn/engine";

export interface IWorkerSpecificEvents
    extends CreateEventMap<
        "engine.worker",
        {
            rpc: EventConfig<{
                base: {};
                extendPhases: {
                    start: RequestMessage;
                    finish: { duration: number } & ResponseMessage;
                };
            }>;
        }
    > {
    "engine.worker.ready": { timestamp: number };
}

export interface IEngineWorkerEvents extends IEngineEvents, IWorkerSpecificEvents {}
