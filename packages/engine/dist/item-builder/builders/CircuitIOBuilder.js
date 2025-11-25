import * as Schema from "@cnbn/schema";
import { spliceAt } from "@cnbn/utils";
import { pinOps } from "@cnbn/helpers";
export class CircuitIOBinder {
    _builtItems;
    constructor(_builtItems) {
        this._builtItems = _builtItems;
    }
    bind(circuit) {
        this._assign(circuit.inputPins, true, circuit.id);
        this._assign(circuit.outputPins, false, circuit.id);
    }
    _assign(io, isInput, circuitId) {
        for (const circuitPin in io) {
            const pinData = io[circuitPin];
            if (isInput && Schema.hasPinInputItems(pinData)) {
                this._bindInputItem(pinData, circuitId, circuitPin);
            }
            else if (Schema.hasPinOutputItem(pinData)) {
                this._bindOutputItem(pinData, circuitId, circuitPin);
            }
        }
    }
    _bindInputItem(pinData, circuitId, circuitPin) {
        if (!pinData.inputItems)
            return;
        pinData.inputItems.forEach(({ itemId, pin }, idx) => {
            const item = this._builtItems.get(itemId);
            if (!item || !Schema.hasItemInputPins(item)) {
                spliceAt(pinData.inputItems, idx);
                return;
            }
            pinOps(item).input.circuitPin.add(pin, circuitId, circuitPin);
        });
    }
    _bindOutputItem(pinData, circuitId, circuitPin) {
        if (!pinData.outputItem)
            return;
        const { itemId, pin } = pinData.outputItem;
        const item = this._builtItems.get(itemId);
        if (!item || !Schema.hasItemOutputPins(item)) {
            delete pinData["outputItem"];
            return;
        }
        pinOps(item).output.circuitPin.add(pin, circuitId, circuitPin);
    }
}
