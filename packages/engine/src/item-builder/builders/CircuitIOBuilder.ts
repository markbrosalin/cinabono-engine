import * as Schema from "@cnbn/schema";
import { BuiltItemsMap } from "../types/ItemBuilder";
import { spliceAt } from "@cnbn/utils";
import { pinOps } from "@cnbn/helpers";

export class CircuitIOBinder {
    constructor(private readonly _builtItems: BuiltItemsMap) {}

    public bind(circuit: Schema.ItemOfKind<"circuit:logic">) {
        this._assign(circuit.inputPins, true, circuit.id);
        this._assign(circuit.outputPins, false, circuit.id);
    }

    private _assign(io: Schema.CircuitPins<"all", "item">, isInput: boolean, circuitId: Schema.Id) {
        for (const circuitPin in io) {
            const pinData = io[circuitPin];

            if (isInput && Schema.hasPinInputItems(pinData)) {
                this._bindInputItem(pinData, circuitId, circuitPin);
            } else if (Schema.hasPinOutputItem(pinData)) {
                this._bindOutputItem(pinData, circuitId, circuitPin);
            }
        }
    }

    private _bindInputItem(
        pinData: Schema.Pin & Schema.WithInputItems,
        circuitId: Schema.Id,
        circuitPin: Schema.PinIndex
    ): void {
        if (!pinData.inputItems) return;

        pinData.inputItems.forEach(({ itemId, pin }, idx) => {
            const item = this._builtItems.get(itemId);

            if (!item || !Schema.hasItemInputPins(item)) {
                spliceAt(pinData.inputItems!, idx);
                return;
            }
            pinOps(item).input.circuitPin.add(pin, circuitId, circuitPin);
        });
    }

    private _bindOutputItem(
        pinData: Schema.Pin & Schema.WithOutputItem,
        circuitId: Schema.Id,
        circuitPin: Schema.PinIndex
    ): void {
        if (!pinData.outputItem) return;

        const { itemId, pin } = pinData.outputItem;
        const item = this._builtItems.get(itemId);

        if (!item || !Schema.hasItemOutputPins(item)) {
            delete pinData["outputItem"];
            return;
        }

        pinOps(item).output.circuitPin.add(pin, circuitId, circuitPin);
    }
}
