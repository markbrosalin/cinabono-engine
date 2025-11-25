import { InnerInOutItem, InputItems, Pin, PinIndex, WithInputItems } from "@cnbn/schema/shared";
export declare const makeInputItemsOps: (pins: Record<PinIndex, Pin & WithInputItems>) => {
    isExist(toPin: PinIndex, { itemId, pin }: InnerInOutItem): boolean;
    get(atPin: PinIndex): InputItems;
    set(atPin: PinIndex, newItems: InnerInOutItem[]): void;
    add(toPin: PinIndex, item: InnerInOutItem): void;
    remove(atPin: PinIndex, { itemId, pin }: InnerInOutItem): void;
};
export declare const makeOutputItemsOps: (pins: Record<PinIndex, Pin>) => {
    set(toPin: PinIndex, newItem: InnerInOutItem): void;
    get(atPin: PinIndex): InnerInOutItem | undefined;
    remove(atPin: PinIndex): void;
};
export declare const pinItemsMap: {
    readonly input: (pins: Record<PinIndex, Pin & WithInputItems>) => {
        isExist(toPin: PinIndex, { itemId, pin }: InnerInOutItem): boolean;
        get(atPin: PinIndex): InputItems;
        set(atPin: PinIndex, newItems: InnerInOutItem[]): void;
        add(toPin: PinIndex, item: InnerInOutItem): void;
        remove(atPin: PinIndex, { itemId, pin }: InnerInOutItem): void;
    };
    readonly output: (pins: Record<PinIndex, Pin>) => {
        set(toPin: PinIndex, newItem: InnerInOutItem): void;
        get(atPin: PinIndex): InnerInOutItem | undefined;
        remove(atPin: PinIndex): void;
    };
};
//# sourceMappingURL=circuit.d.ts.map