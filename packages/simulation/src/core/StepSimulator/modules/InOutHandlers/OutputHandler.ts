import { SimOutputEvent } from "@sim/model";
import { InOutHandlerDeps, OutputHandlerContract } from "./contracts";
import { hasItemOutputPins, ItemOfKind } from "@cnbn/schema";
import { pinOps } from "@cnbn/helpers";

export class DefaultOutputHandler implements OutputHandlerContract {
    constructor(private readonly _ctx: InOutHandlerDeps) {}

    public handle(ev: SimOutputEvent): boolean {
        if (this._isOldGeneration(ev)) return false;

        const item = this._ctx.getItem(ev.itemId);
        if (!item) return false;

        const isOutputChanged = this._updateOutput(item, ev);
        if (!isOutputChanged) return false;

        return true;
    }

    private _isOldGeneration(ev: SimOutputEvent) {
        return !this._ctx.genTracker.same(ev.gen, ev.itemId, ev.pin);
    }

    private _updateOutput(item: ItemOfKind, ev: SimOutputEvent): boolean {
        if (!hasItemOutputPins(item)) return false;
        const outputOps = pinOps(item).output.value;

        const oldValue = outputOps.get(ev.pin);
        const isUpdated = oldValue !== ev.value;
        if (!isUpdated) return false;

        outputOps.set(ev.pin, ev.value);

        return isUpdated;
    }
}
