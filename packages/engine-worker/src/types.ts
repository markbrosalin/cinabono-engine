import { IWorkerSpecificEvents } from "./events";

/* eslint-disable @typescript-eslint/no-explicit-any */
export type RpcPendingId = `${string}-${number}`;

type MessageType =
    | "request_api"
    | "response_api"
    | "subscribe_event"
    | "unsubscribe_event"
    | "response_event";

export interface BaseMessage {
    type: MessageType;
    timestamp: number;
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

export interface EmitEventMessage<
    T extends keyof IWorkerSpecificEvents = keyof IWorkerSpecificEvents,
> extends BaseMessage {
    type: "response_event";
    event: T;
    payload: IWorkerSpecificEvents[T];
}

export interface SubEventMessage extends BaseMessage {
    type: "subscribe_event";
    pattern: string;
}

export interface UnsubEventMessage extends BaseMessage {
    type: "unsubscribe_event";
    pattern: string;
}

export type WorkerMessage =
    | RequestMessage
    | ResponseMessage
    | EmitEventMessage
    | SubEventMessage
    | UnsubEventMessage;

type TruthyResponse = Extract<ResponseMessage, { ok: true }>;
type FalsyResponse = Extract<ResponseMessage, { ok: false }>;

export interface PendingResponce {
    resolve: (value: TruthyResponse["result"]) => void;
    reject: (response?: FalsyResponse) => void;
}
