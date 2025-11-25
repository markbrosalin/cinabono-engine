import { hasPinInputItems, hasPinOutputItem } from "@cnbn/schema";
export const makeInputItemsOps = (pins) => {
    return {
        isExist(toPin, { itemId, pin }) {
            const inputItems = this.get(toPin);
            return !!inputItems.some((v) => v.itemId === itemId && v.pin === pin);
        },
        get(atPin) {
            return hasPinInputItems(pins[atPin]) ? (pins[atPin].inputItems ?? []) : [];
        },
        set(atPin, newItems) {
            if (hasPinInputItems(pins[atPin]))
                pins[atPin].inputItems = newItems;
        },
        add(toPin, item) {
            const inputItems = this.get(toPin);
            if (!inputItems || !this.isExist(toPin, item))
                return;
            inputItems.push(item);
        },
        remove(atPin, { itemId, pin }) {
            const pinData = pins[atPin];
            if (!hasPinInputItems(pinData))
                return;
            const inputItems = pinData.inputItems ?? [];
            const filtered = inputItems.filter((v) => v.itemId === itemId && v.pin === pin);
            if (filtered.length)
                pinData.inputItems = filtered;
            else
                delete pinData.inputItems;
        },
    };
};
export const makeOutputItemsOps = (pins) => {
    return {
        set(toPin, newItem) {
            if (hasPinOutputItem(pins[toPin]))
                pins[toPin].outputItem = newItem;
        },
        get(atPin) {
            if (!hasPinOutputItem(pins[atPin]))
                return;
            return pins[atPin].outputItem;
        },
        remove(atPin) {
            if (hasPinOutputItem(pins[atPin])) {
                delete pins[atPin]["outputItem"];
            }
        },
    };
};
export const pinItemsMap = {
    input: makeInputItemsOps,
    output: makeOutputItemsOps,
};
