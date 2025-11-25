export class DefaultComputeService {
    constructor({ stores, engine }) {
        this._bakeStore = stores.bake;
        this._engine = engine;
    }
    computeOuts(item) {
        return this._engine.computeOuts(item);
    }
    get bakeStore() {
        return this._bakeStore;
    }
}
