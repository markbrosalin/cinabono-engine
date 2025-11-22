import { describe, expect, it } from "vitest";
import { IOBuilder } from "../builders/IOBuilder";
import {
    scene_items_of_custom_buffer,
    scene_items_of_rs_trigger,
} from "../../__tests_/scenes/ready_to_use";

describe("IOBuilder", () => {
    it("1 toggle with 2 outputs in RS-trigger makes 2 input pins for the circuit", () => {
        const { deps, items, scopes, inputs } = scene_items_of_rs_trigger();

        const io = new IOBuilder(deps);
        const pins = io.buildInputPins(inputs, scopes["root"]);

        expect(Object.keys(pins)).toHaveLength(2);
        expect(pins[0].inputItems).toEqual([{ itemId: items.nor1.id, pin: "0" }]);
        expect(pins[1].inputItems).toEqual([{ itemId: items.nor2.id, pin: "1" }]);
    });

    it("1 lamp with 2 inputs in RS-trigger makes 2 output pins for the circuit", () => {
        const { deps, scopes, outputs, items } = scene_items_of_rs_trigger();

        const io = new IOBuilder(deps);
        const pins = io.buildOutputPins(outputs, scopes["root"]);

        expect(Object.keys(pins)).toHaveLength(2);
        expect(pins[0].outputItem).toEqual({ itemId: items.nor1.id, pin: "0" });
        expect(pins[1].outputItem).toEqual({ itemId: items.nor2.id, pin: "0" });
    });

    it("Toggle in Custom-buffer makes input pin linked to the inner item of the circuit", () => {
        const { deps, items, scopes, inputs } = scene_items_of_custom_buffer();

        const io = new IOBuilder(deps);
        const pins = io.buildInputPins(inputs, scopes["root"]);

        expect(Object.keys(pins)).toHaveLength(1);
        expect(pins[0].inputItems).toEqual([{ itemId: items.buffer1.id, pin: "0" }]);
    });

    it("Lamp in Custom-buffer makes output pin linked to the inner item of the circuit", () => {
        const { deps, items, scopes, outputs } = scene_items_of_custom_buffer();

        const io = new IOBuilder(deps);
        const pins = io.buildOutputPins(outputs, scopes["root"]);

        expect(Object.keys(pins)).toHaveLength(1);
        expect(pins[0].outputItem).toEqual({
            itemId: items.buffer1.id,
            pin: "0",
        });
    });
});
