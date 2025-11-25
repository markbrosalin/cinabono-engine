export type RpcPendingId = `${string}-${number}`;
export interface RpcPending {
    resolve: (value: TruthyResponce["result"]) => void;
    reject: (reason?: Pick<FalsyResponce, "error" | "request">) => void;
}
export type RpcRequest = {
    id: RpcPendingId;
    path: string;
    payload: unknown;
};
type TruthyResponce<R = any> = {
    ok: true;
    request: RpcRequest;
    result: R;
};
type FalsyResponce = {
    ok: false;
    request: RpcRequest;
    error: unknown;
};
export type RpcResponse<R = any> = TruthyResponce<R> | FalsyResponce;
export {};
//# sourceMappingURL=types.d.ts.map