import { uniqueKeyByData } from "@cnbn/utils";
export class DefaultPinUpdateStore {
    constructor() {
        this._updates = new Map();
    }
    getAll() {
        return Array.from(this._updates.values());
    }
    saveInput({ itemId, pin, value, t }) {
        this._save({ kind: "input", itemId, pin, value, t });
    }
    saveOutput({ itemId, pin, value, t }) {
        this._save({ kind: "output", itemId, pin, value, t });
    }
    clear() {
        this._updates.clear();
    }
    _save(update) {
        this._updates.set(this._makeKey(update), update);
    }
    _makeKey(u) {
        return uniqueKeyByData(u.itemId, u.pin, u.kind);
    }
}
