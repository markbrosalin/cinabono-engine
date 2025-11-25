import { hasItemOutputPins } from "@cnbn/schema";
import { pinOps } from "@cnbn/helpers";
export class DefaultOutputHandler {
    constructor(_ctx) {
        this._ctx = _ctx;
    }
    handle(ev) {
        if (this._isOldGeneration(ev))
            return false;
        const item = this._ctx.getItem(ev.itemId);
        if (!item)
            return false;
        const isOutputChanged = this._updateOutput(item, ev);
        if (!isOutputChanged)
            return false;
        return true;
    }
    _isOldGeneration(ev) {
        return !this._ctx.genTracker.same(ev.gen, ev.itemId, ev.pin);
    }
    _updateOutput(item, ev) {
        if (!hasItemOutputPins(item))
            return false;
        const outputOps = pinOps(item).output.value;
        const oldValue = outputOps.get(ev.pin);
        const isUpdated = oldValue !== ev.value;
        if (!isUpdated)
            return false;
        outputOps.set(ev.pin, ev.value);
        return isUpdated;
    }
}
