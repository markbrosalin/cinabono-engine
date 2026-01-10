import { TabServiceContract } from "../container-manager/tab";
import { AppCtx } from "../context-provider/app/types";
import { EventBusContract, EventName, EventPayloads } from "../event-bus";

export interface SagaContext {
    appCtx: AppCtx;
    eventBus: EventBusContract;
    tabService: TabServiceContract;
}

export interface SagaRollback {
    name: string;
    undo: () => Promise<unknown> | unknown;
}

export type SagaPayload<K extends EventName> = EventPayloads[K];
