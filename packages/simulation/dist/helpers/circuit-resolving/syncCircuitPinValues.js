import { listAllCircuitPins, pinOps } from "@cnbn/helpers";
import { isCircuitItem } from "@cnbn/schema";
export const syncCircuitPinValues = (getItem, itemId) => {
    const item = getItem(itemId);
    if (!item)
        return;
    const all = listAllCircuitPins(item);
    const propagateToCircuits = (refs, newValue, type) => {
        for (const ref of refs) {
            const circuit = getItem(ref.circuitId);
            if (!circuit || !isCircuitItem(circuit))
                continue;
            pinOps(circuit)[type].value.set(ref.circuitPin, newValue);
        }
    };
    for (const [pin, circuitRefs] of all.in) {
        const value = pinOps(item).input.value.get(pin);
        propagateToCircuits(circuitRefs, value, "input");
    }
    for (const [pin, circuitRefs] of all.out) {
        const value = pinOps(item).output.value.get(pin);
        propagateToCircuits(circuitRefs, value, "output");
    }
};
