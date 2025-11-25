import { PinIndex } from "@cnbn/schema";
import { CircuitPinRef, Id, ItemOfKind, LogicValue } from "@cnbn/schema/shared";
export declare const mkDefaultPins: <T extends Record<string, unknown>>(count: number, pinData?: (i: number) => T) => Record<string, T>;
export declare const pinOps: (item: ItemOfKind) => {
    input: {
        value: {
            get(pin: PinIndex): LogicValue;
            set(pin: PinIndex, value: LogicValue): void;
            resetAll(value: LogicValue): void;
        };
        circuitPin: {
            listByPin(pin: PinIndex): CircuitPinRef[];
            listAll(): (readonly [string, CircuitPinRef[]])[];
            add(pin: PinIndex, circuitId: Id, circuitPin: PinIndex): void;
            remove(pin: PinIndex, circuitId: Id, circuitPin: PinIndex): void;
            clearAll(): void;
        };
        items: {
            isExist(toPin: PinIndex, { itemId, pin }: import("@cnbn/schema").InnerInOutItem): boolean;
            get(atPin: PinIndex): import("@cnbn/schema").InputItems;
            set(atPin: PinIndex, newItems: import("@cnbn/schema").InnerInOutItem[]): void;
            add(toPin: PinIndex, item: import("@cnbn/schema").InnerInOutItem): void;
            remove(atPin: PinIndex, { itemId, pin }: import("@cnbn/schema").InnerInOutItem): void;
        };
    };
    output: {
        value: {
            get(pin: PinIndex): LogicValue;
            set(pin: PinIndex, value: LogicValue): void;
            resetAll(value: LogicValue): void;
        };
        circuitPin: {
            listByPin(pin: PinIndex): CircuitPinRef[];
            listAll(): (readonly [string, CircuitPinRef[]])[];
            add(pin: PinIndex, circuitId: Id, circuitPin: PinIndex): void;
            remove(pin: PinIndex, circuitId: Id, circuitPin: PinIndex): void;
            clearAll(): void;
        };
        items: {
            set(toPin: PinIndex, newItem: import("@cnbn/schema").InnerInOutItem): void;
            get(atPin: PinIndex): import("@cnbn/schema").InnerInOutItem | undefined;
            remove(atPin: PinIndex): void;
        };
    };
};
//# sourceMappingURL=pin.d.ts.map