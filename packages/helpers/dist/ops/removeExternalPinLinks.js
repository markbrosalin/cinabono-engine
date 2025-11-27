import { listAllCircuitPins } from "./listAllCircuitPins.js";
import { processMany } from "@cnbn/utils";
import { pinOps } from "../item/pin.js";
export const removeExternalPinLinks = (getItem, item) => {
    const { in: inputPins, out: outputPins } = listAllCircuitPins(item);
    removeInputLinks(getItem, item, inputPins);
    removeOutputLinks(getItem, outputPins);
};
function removeInputLinks(getItem, item, pinsMap) {
    processMany(pinsMap, ([pin, circuitPins]) => {
        processMany(circuitPins, ({ circuitId, circuitPin }) => {
            const parent = getItem(circuitId);
            if (!parent)
                return;
            pinOps(parent).input.items.remove(circuitPin, {
                itemId: item.id,
                pin,
            });
        });
    });
}
function removeOutputLinks(getItem, pinsMap) {
    processMany(pinsMap, ([_, circuitPins]) => {
        processMany(circuitPins, ({ circuitId, circuitPin }) => {
            const parent = getItem(circuitId);
            if (!parent)
                return;
            pinOps(parent).output.items.remove(circuitPin);
        });
    });
}
