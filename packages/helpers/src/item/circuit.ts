import { hasPinInputItems, hasPinOutputItem } from "@cnbn/schema";
import { InnerInOutItem, InputItems, Pin, PinIndex, WithInputItems } from "@cnbn/schema/shared";

export const makeInputItemsOps = (pins: Record<PinIndex, Pin & WithInputItems>) => {
    return {
        isExist(toPin: PinIndex, { itemId, pin }: InnerInOutItem): boolean {
            const inputItems = this.get(toPin);
            return !!inputItems.some((v) => v.itemId === itemId && v.pin === pin);
        },

        get(atPin: PinIndex): InputItems {
            return hasPinInputItems(pins[atPin]) ? (pins[atPin].inputItems ?? []) : [];
        },

        set(atPin: PinIndex, newItems: InnerInOutItem[]) {
            if (hasPinInputItems(pins[atPin])) pins[atPin].inputItems = newItems;
        },

        add(toPin: PinIndex, item: InnerInOutItem) {
            const inputItems = this.get(toPin);
            if (!inputItems || !this.isExist(toPin, item)) return;

            inputItems.push(item);
        },

        remove(atPin: PinIndex, { itemId, pin }: InnerInOutItem) {
            const pinData = pins[atPin];
            if (!hasPinInputItems(pinData)) return;

            const inputItems = pinData.inputItems ?? [];
            const filtered = inputItems.filter((v) => v.itemId === itemId && v.pin === pin);

            if (filtered.length) pinData.inputItems = filtered;
            else delete pinData.inputItems;
        },
    };
};

export const makeOutputItemsOps = (pins: Record<PinIndex, Pin>) => {
    return {
        set(toPin: PinIndex, newItem: InnerInOutItem) {
            if (hasPinOutputItem(pins[toPin])) pins[toPin].outputItem = newItem;
        },

        get(atPin: PinIndex) {
            if (!hasPinOutputItem(pins[atPin])) return;
            return pins[atPin].outputItem;
        },

        remove(atPin: PinIndex) {
            if (hasPinOutputItem(pins[atPin])) {
                delete pins[atPin]["outputItem"];
            }
        },
    };
};

export const pinItemsMap = {
    input: makeInputItemsOps,
    output: makeOutputItemsOps,
} as const;
