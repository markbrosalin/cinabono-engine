import { IEngineWorkerEvents } from "./events.js";
import { ExtractSubMapByPatterns } from "@cnbn/entities-runtime/eventBus";
export type RpcPendingId = `${string}-${number}`;
type MessageType = "request_api" | "response_api" | "worker_event" | "engine_event";
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
export type ResponseMessage<R = any> = BaseMessage & {
    type: "response_api";
} & ({
    ok: true;
    request: RequestMessage;
    result: R;
} | {
    ok: false;
    request: RequestMessage;
    error: unknown;
});
export interface WorkerEventMessage<T = any> extends BaseMessage {
    type: "worker_event";
    name: keyof ExtractSubMapByPatterns<IEngineWorkerEvents, ["workerEngine.**"]>;
    payload: T;
}
export interface EngineEventMessage<T = any> extends BaseMessage {
    type: "engine_event";
    name: keyof ExtractSubMapByPatterns<IEngineWorkerEvents, ["engine.**"]>;
    payload: T;
}
export type WorkerMessageMap = {
    request_api: RequestMessage;
    response_api: ResponseMessage;
    engine_event: EngineEventMessage;
    worker_event: WorkerEventMessage;
};
export type WorkerMessage = WorkerMessageMap[keyof WorkerMessageMap];
type TruthyResponse = Extract<ResponseMessage, {
    ok: true;
}>;
type FalsyResponse = Extract<ResponseMessage, {
    ok: false;
}>;
export interface PendingResponce {
    resolve: (value: TruthyResponse["result"]) => void;
    reject: (response?: FalsyResponse) => void;
}
export {};
//# sourceMappingURL=types.d.ts.map