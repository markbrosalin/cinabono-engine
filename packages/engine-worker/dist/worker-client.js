import { EventBus } from "@cnbn/entities-runtime";
import { EngineWorkerEvents } from "./patterns.js";
export class CinabonoClient {
    constructor(worker, bus = new EventBus()) {
        this.worker = worker;
        this.bus = bus;
        this._id = 0;
        this._pendingRpc = new Map();
        this._isReadyStatus = false;
        this._isReadyPromise = new Promise((resolve) => {
            this.bus.once(EngineWorkerEvents.workerEngine.ready, ({ payload }) => {
                this._isReadyStatus = payload;
                resolve(payload);
            });
        });
        // subscribe on messages from worker
        worker.onmessage = (e) => {
            const msg = e.data;
            switch (msg.type) {
                case "response_api":
                    this._handleRpc(msg);
                    break;
                case "response_event":
                    this.bus.emit(msg.event, msg.payload);
                    break;
            }
        };
    }
    async isReady() {
        return this._isReadyStatus ? this._isReadyStatus : await this._isReadyPromise;
    }
    async call(command, payload) {
        const requestId = this._getNextId(command);
        this.bus.emit(EngineWorkerEvents.workerEngine.rpc.start, {
            command,
            id: requestId,
            payload,
            timestamp: Date.now(),
            type: "request_api",
        });
        return new Promise((resolve, reject) => {
            this._pendingRpc.set(requestId, { resolve, reject });
            this.worker.postMessage({
                id: requestId,
                command,
                payload,
                timestamp: Date.now(),
                type: "request_api",
            });
        });
    }
    on(pattern, callback) {
        if (pattern.includes("engine")) {
            this.worker.postMessage({
                type: "subscribe_event",
                pattern,
                timestamp: Date.now(),
            });
        }
        return this.bus.on(pattern, callback);
    }
    off(pattern, callback) {
        this.worker.postMessage({
            type: "unsubscribe_event",
            pattern,
            timestamp: Date.now(),
        });
        this.bus.off(pattern, callback);
    }
    _handleRpc(response) {
        const { ok, request } = response;
        const p = this._pendingRpc.get(request.id);
        if (!p)
            return;
        this._pendingRpc.delete(request.id);
        const duration = response.timestamp - request.timestamp;
        if (ok) {
            this.bus.emit(EngineWorkerEvents.workerEngine.rpc.finish, {
                ...response,
                duration,
            });
            p.resolve(response.result);
        }
        else {
            this.bus.emit(EngineWorkerEvents.workerEngine.rpc.error, {
                ...response,
                duration,
            });
            p.reject(response);
        }
    }
    _getNextId(command) {
        return `${command}-${this._id++}`;
    }
}
