import { stub } from "@cnbn/utils";
export class WorkerClient {
    constructor(worker) {
        this.worker = worker;
        this._id = 0;
        this._pending = new Map();
        worker.onmessage = (e) => {
            const responce = e.data;
            const { ok, request } = responce;
            const p = this._pending.get(request.id);
            if (!p)
                return;
            this._pending.delete(request.id);
            if (ok)
                p.resolve(responce.result);
            else
                p.reject({ error: responce.error, request });
        };
    }
    get callApi() {
        return {
            "/item/create": this._rpcify("/item/create", stub()),
            "/item/link": this._rpcify("/item/link", stub()),
            "/item/remove": this._rpcify("/item/remove", stub()),
            "/item/unlink": this._rpcify("/item/unlink", stub()),
            "/tab/create": this._rpcify("/tab/create", stub()),
            "/tab/remove": this._rpcify("/tab/remove", stub()),
        };
    }
    _rpcify(path, _fn) {
        return async (payload) => {
            const requestId = this._getNextId(path);
            return new Promise((resolve, reject) => {
                this._pending.set(requestId, { resolve, reject });
                this.worker.postMessage({ id: requestId, path, payload });
            });
        };
    }
    _getNextId(path) {
        return `${path}-${this._id++}`;
    }
}
