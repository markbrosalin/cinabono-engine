export class CallbackManager {
    constructor() {
        this.cbs = {};
    }
    run(cbName, payload) {
        var _a;
        const callbacks = ((_a = this.cbs)[cbName] ?? (_a[cbName] = []));
        callbacks.forEach((cb) => cb(payload));
        return this;
    }
    add(cbName, cbs) {
        var _a;
        const callbacks = ((_a = this.cbs)[cbName] ?? (_a[cbName] = []));
        callbacks.push(...cbs);
        return this;
    }
}
