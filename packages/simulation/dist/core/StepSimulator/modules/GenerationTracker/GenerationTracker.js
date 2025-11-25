import { uniqueKeyByData } from "@cnbn/utils";
export class DefaultGenerationTracker {
    constructor() {
        this._outputGens = new Map();
    }
    get(itemId, outPin) {
        return this._outputGens.get(`${itemId}:${outPin}`) ?? 0;
    }
    bump(itemId, outPin) {
        const key = this._key(itemId, outPin);
        const next = this.get(itemId, outPin) + 1;
        this._outputGens.set(key, next);
        return next;
    }
    same(evGen, itemId, outPin) {
        return evGen === this.get(itemId, outPin);
    }
    reset() {
        this._outputGens.clear();
    }
    _key(itemId, outPin) {
        return uniqueKeyByData(itemId, outPin);
    }
}
