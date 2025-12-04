import { IWorkerSpecificEvents } from "./events";
import { IEngineEvents } from "@cnbn/engine";

/* eslint-disable @typescript-eslint/no-explicit-any */
export type RpcPendingId = `${string}-${number}`;

type MessageType = "request_api" | "response_api" | "worker_event" | "engine_event";

export interface BaseMessage {
    type: MessageType;
    timestamp: number; // performance.now()
}

export interface RequestMessage extends BaseMessage {
    type: "request_api";
    id: RpcPendingId;
    command: string;
    payload: unknown;
}

export type ResponseMessage<R = any> = BaseMessage & { type: "response_api" } & (
        | {
              ok: true;
              request: RequestMessage;
              result: R;
          }
        | {
              ok: false;
              request: RequestMessage;
              error: unknown;
          }
    );

export interface WorkerEventMessage<
    T extends keyof IWorkerSpecificEvents = keyof IWorkerSpecificEvents,
> extends BaseMessage {
    type: "worker_event";
    name: T;
    payload: IWorkerSpecificEvents[T];
}

export interface EngineEventMessage<T extends keyof IEngineEvents = keyof IEngineEvents>
    extends BaseMessage {
    type: "engine_event";
    name: T;
    payload: IEngineEvents[T];
}

export type WorkerMessage =
    | RequestMessage
    | ResponseMessage
    | EngineEventMessage
    | WorkerEventMessage;

type TruthyResponse = Extract<ResponseMessage, { ok: true }>;
type FalsyResponse = Extract<ResponseMessage, { ok: false }>;

export interface PendingResponce {
    resolve: (value: TruthyResponse["result"]) => void;
    reject: (response?: FalsyResponse) => void;
}
