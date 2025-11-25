import { hasItemInputPins } from "@cnbn/schema";
import { pinOps } from "@cnbn/helpers";
export class DefaultInputHandler {
    constructor(_ctx) {
        this._ctx = _ctx;
    }
    handle(ev) {
        if (this._isOldInput(ev))
            return false;
        const item = this._ctx.getItem(ev.itemId);
        if (!item)
            return false;
        const isInputChanged = this._updateInput(item, ev);
        if (!isInputChanged)
            return false;
        return true;
    }
    _isOldInput(ev) {
        return (ev.srcItemId != null &&
            ev.srcOutPin != null &&
            !this._ctx.genTracker.same(ev.gen, ev.srcItemId, ev.srcOutPin));
    }
    _updateInput(item, ev) {
        if (!hasItemInputPins(item))
            return false;
        const inputOps = pinOps(item).input.value;
        const oldValue = inputOps.get(ev.pin);
        const isUpdated = oldValue !== ev.value;
        if (!isUpdated)
            return false;
        inputOps.set(ev.pin, ev.value);
        return isUpdated;
    }
}
