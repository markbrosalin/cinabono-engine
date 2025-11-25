export class DefaultEngine {
    constructor(_exec, _api) {
        this._exec = _exec;
        this._api = _api;
    }
    callApi(path, ...payload) {
        return this._exec.call(path, {}, ...payload);
    }
    get api() {
        return this._api;
    }
}
