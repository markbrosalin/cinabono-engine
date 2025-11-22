import { PinIndex, hasItemInputPins, hasItemOutputPins } from "@cnbn/schema";
import { CircuitPinRef, Id, ItemOfKind, LogicValue, Pin } from "@cnbn/schema/shared";
import { pinItemsMap } from "./circuit";

export const mkDefaultPins = <T extends Record<string, unknown>>(
    count: number,
    pinData?: (i: number) => T
): Record<string, T> => {
    return Object.fromEntries(
        Array.from({ length: count }, (_, i) => [i, { ...pinData?.(i) }])
    ) as Record<string, T>;
};

export const pinOps = (item: ItemOfKind) => {
    function makeValueOps(pins: Record<PinIndex, Pin>) {
        return {
            get(pin: PinIndex): LogicValue {
                return pins[pin].value;
            },

            set(pin: PinIndex, value: LogicValue) {
                const p = pins[pin];
                if (p) p.value = value;
            },

            resetAll(value: LogicValue) {
                for (const p of Object.values(pins)) {
                    p.value = value;
                }
            },
        };
    }

    function makeCircuitPinOps(pins: Record<PinIndex, Pin>) {
        function isExist(pin: Pin, circuitId: Id, circuitPin: PinIndex): boolean {
            return !!pin.circuitPins?.some(
                (p) => p.circuitId === circuitId && p.circuitPin === circuitPin
            );
        }

        return {
            listByPin(pin: PinIndex): CircuitPinRef[] {
                if (pin !== undefined) return pins[pin]?.circuitPins ?? [];
                return Object.values(pins).flatMap((p) => p.circuitPins ?? []);
            },

            listAll() {
                return Object.entries(pins).map(
                    ([p, data]) => [p, data.circuitPins ?? []] as const
                );
            },

            add(pin: PinIndex, circuitId: Id, circuitPin: PinIndex) {
                const p = pins[pin];
                if (!p) return;

                p.circuitPins ??= [];
                if (!isExist(p, circuitId, circuitPin)) {
                    p.circuitPins.push({ circuitId, circuitPin });
                }
            },

            remove(pin: PinIndex, circuitId: Id, circuitPin: PinIndex) {
                const p = pins[pin];
                if (!p.circuitPins?.length) return;

                p.circuitPins = p.circuitPins.filter(
                    (cp) => cp.circuitId !== circuitId || cp.circuitPin !== circuitPin
                );
                if (!p.circuitPins.length) delete p.circuitPins;
            },

            clearAll() {
                for (const pin of Object.values(pins)) {
                    delete pin["circuitPins"];
                }
            },
        };
    }

    function makePinOrchestrator<T extends "input" | "output">(
        type: T,
        pins: Record<PinIndex, Pin>
    ) {
        return {
            value: makeValueOps(pins),
            circuitPin: makeCircuitPinOps(pins),
            items: pinItemsMap[type](pins) as ReturnType<(typeof pinItemsMap)[T]>,
        };
    }

    const inputPins = hasItemInputPins(item) ? item.inputPins : {};
    const outputPins = hasItemOutputPins(item) ? item.outputPins : {};

    return {
        input: makePinOrchestrator("input", inputPins),
        output: makePinOrchestrator("output", outputPins),
    };
};
