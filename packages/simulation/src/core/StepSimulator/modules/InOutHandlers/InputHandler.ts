import { SimInputEvent } from "@sim/model";
import { InputHandlerContract, InOutHandlerDeps } from "./contracts";
import { hasItemInputPins, ItemOfKind } from "@cnbn/schema";
import { pinOps } from "@cnbn/helpers";

export class DefaultInputHandler implements InputHandlerContract {
    constructor(private readonly _ctx: InOutHandlerDeps) {}

    public handle(ev: SimInputEvent): boolean {
        if (this._isOldInput(ev)) return false;

        const item = this._ctx.getItem(ev.itemId);
        if (!item) return false;

        const isInputChanged = this._updateInput(item, ev);
        if (!isInputChanged) return false;

        return true;
    }

    private _isOldInput(ev: SimInputEvent) {
        return (
            ev.srcItemId != null &&
            ev.srcOutPin != null &&
            !this._ctx.genTracker.same(ev.gen, ev.srcItemId, ev.srcOutPin)
        );
    }

    private _updateInput(item: ItemOfKind, ev: SimInputEvent): boolean {
        if (!hasItemInputPins(item)) return false;

        const inputOps = pinOps(item).input.value;

        const oldValue = inputOps.get(ev.pin);
        const isUpdated = oldValue !== ev.value;
        if (!isUpdated) return false;

        inputOps.set(ev.pin, ev.value);

        return isUpdated;
    }
}
