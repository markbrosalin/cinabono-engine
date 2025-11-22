import { ItemOfKind, Read } from "@cnbn/schema/shared";
import { listAllCircuitPins } from "./listAllCircuitPins";
import { processMany } from "@cnbn/utils";
import { pinOps } from "../item/pin";

export const removeExternalPinLinks = (getItem: Read<"item">, item: ItemOfKind) => {
    const { in: inputPins, out: outputPins } = listAllCircuitPins(item);

    removeInputLinks(getItem, item, inputPins);
    removeOutputLinks(getItem, outputPins);
};

function removeInputLinks(
    getItem: Read<"item">,
    item: ItemOfKind,
    pinsMap: ReturnType<typeof listAllCircuitPins>["in"]
) {
    processMany(pinsMap, ([pin, circuitPins]) => {
        processMany(circuitPins, ({ circuitId, circuitPin }) => {
            const parent = getItem(circuitId);
            if (!parent) return;

            pinOps(parent).input.items.remove(circuitPin, {
                itemId: item.id,
                pin,
            });
        });
    });
}

function removeOutputLinks(
    getItem: Read<"item">,
    pinsMap: ReturnType<typeof listAllCircuitPins>["out"]
) {
    processMany(pinsMap, ([_, circuitPins]) => {
        processMany(circuitPins, ({ circuitId, circuitPin }) => {
            const parent = getItem(circuitId);
            if (!parent) return;

            pinOps(parent).output.items.remove(circuitPin);
        });
    });
}
