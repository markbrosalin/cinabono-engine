import { PublicApiByPath } from "@cnbn/engine";
import { stub } from "@cnbn/utils";
import { RpcPending, RpcPendingId, RpcRequest, RpcResponse } from "@worker/types";

export class WorkerClient {
    private _id = 0;
    private _pending = new Map<RpcPendingId, RpcPending>();

    constructor(protected readonly worker: Worker) {
        worker.onmessage = (e: MessageEvent<RpcResponse>) => {
            const responce = e.data;

            const { ok, request } = responce;

            const p = this._pending.get(request.id);
            if (!p) return;

            this._pending.delete(request.id);

            if (ok) p.resolve(responce.result);
            else p.reject({ error: responce.error, request });
        };
    }

    public get callApi() {
        return {
            "/item/create": this._rpcify("/item/create", stub<PublicApiByPath["/item/create"]>()),
            "/item/link": this._rpcify("/item/link", stub<PublicApiByPath["/item/link"]>()),
            "/item/remove": this._rpcify("/item/remove", stub<PublicApiByPath["/item/remove"]>()),
            "/item/unlink": this._rpcify("/item/unlink", stub<PublicApiByPath["/item/unlink"]>()),
            "/tab/create": this._rpcify("/tab/create", stub<PublicApiByPath["/tab/create"]>()),
            "/tab/remove": this._rpcify("/tab/remove", stub<PublicApiByPath["/tab/remove"]>()),
        } satisfies Record<keyof PublicApiByPath, unknown>;
    }

    private _rpcify<U, V>(path: string, _fn: (input: U) => V): (payload: U) => Promise<V> {
        return async (payload) => {
            const requestId = this._getNextId(path);

            return new Promise((resolve, reject) => {
                this._pending.set(requestId, { resolve, reject });
                this.worker.postMessage({ id: requestId, path, payload } satisfies RpcRequest);
            });
        };
    }

    private _getNextId(path: string): RpcPendingId {
        return `${path}-${this._id++}`;
    }
}
