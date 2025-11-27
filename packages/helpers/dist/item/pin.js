import { hasItemInputPins, hasItemOutputPins } from "@cnbn/schema";
import { pinItemsMap } from "./circuit.js";
export const mkDefaultPins = (count, pinData) => {
    return Object.fromEntries(Array.from({ length: count }, (_, i) => [i, { ...pinData?.(i) }]));
};
export const pinOps = (item) => {
    function makeValueOps(pins) {
        return {
            get(pin) {
                return pins[pin].value;
            },
            set(pin, value) {
                const p = pins[pin];
                if (p)
                    p.value = value;
            },
            resetAll(value) {
                for (const p of Object.values(pins)) {
                    p.value = value;
                }
            },
        };
    }
    function makeCircuitPinOps(pins) {
        function isExist(pin, circuitId, circuitPin) {
            return !!pin.circuitPins?.some((p) => p.circuitId === circuitId && p.circuitPin === circuitPin);
        }
        return {
            listByPin(pin) {
                if (pin !== undefined)
                    return pins[pin]?.circuitPins ?? [];
                return Object.values(pins).flatMap((p) => p.circuitPins ?? []);
            },
            listAll() {
                return Object.entries(pins).map(([p, data]) => [p, data.circuitPins ?? []]);
            },
            add(pin, circuitId, circuitPin) {
                const p = pins[pin];
                if (!p)
                    return;
                p.circuitPins ?? (p.circuitPins = []);
                if (!isExist(p, circuitId, circuitPin)) {
                    p.circuitPins.push({ circuitId, circuitPin });
                }
            },
            remove(pin, circuitId, circuitPin) {
                const p = pins[pin];
                if (!p.circuitPins?.length)
                    return;
                p.circuitPins = p.circuitPins.filter((cp) => cp.circuitId !== circuitId || cp.circuitPin !== circuitPin);
                if (!p.circuitPins.length)
                    delete p.circuitPins;
            },
            clearAll() {
                for (const pin of Object.values(pins)) {
                    delete pin["circuitPins"];
                }
            },
        };
    }
    function makePinOrchestrator(type, pins) {
        return {
            value: makeValueOps(pins),
            circuitPin: makeCircuitPinOps(pins),
            items: pinItemsMap[type](pins),
        };
    }
    const inputPins = hasItemInputPins(item) ? item.inputPins : {};
    const outputPins = hasItemOutputPins(item) ? item.outputPins : {};
    return {
        input: makePinOrchestrator("input", inputPins),
        output: makePinOrchestrator("output", outputPins),
    };
};
