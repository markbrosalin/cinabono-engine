export class CinabonoEngine {
    _ctx;
    constructor(_ctx) {
        this._ctx = _ctx;
    }
    get api() {
        return this._ctx.api;
    }
    get deps() {
        return this._ctx.deps;
    }
    get plugins() {
        return this._ctx.plugins;
    }
    get infra() {
        return this._ctx.infra;
    }
    get options() {
        return this._ctx.options;
    }
    sub() { }
}
