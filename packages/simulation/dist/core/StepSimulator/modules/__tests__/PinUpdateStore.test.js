import { DefaultPinUpdateStore, } from "../../../../core/StepSimulator/modules/PinUpdateStore/index.js";
import { describe, it, expect, beforeEach } from "vitest";
describe("PinUpdateStore", () => {
    let pinStore;
    beforeEach(() => {
        pinStore = new DefaultPinUpdateStore();
    });
    it("return saved entries", () => {
        const pinEntry1 = { itemId: "A", pin: "0", value: "0", t: 0 };
        const pinEntry2 = { itemId: "B", pin: "2", value: "1", t: 2 };
        pinStore.saveInput(pinEntry1);
        pinStore.saveOutput(pinEntry2);
        const updates = pinStore.getAll();
        expect(updates.length).toBe(2);
        expect(updates[0]).toMatchObject({ ...pinEntry1, kind: "input" });
        expect(updates[1]).toMatchObject({ ...pinEntry2, kind: "output" });
    });
    it("should clear all entries", () => {
        const pinEntry1 = { itemId: "A", pin: "0", value: "0", t: 0 };
        pinStore.saveInput(pinEntry1);
        pinStore.clear();
        const updates = pinStore.getAll();
        expect(updates.length).toBe(0);
    });
});
