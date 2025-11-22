import { describe, it, expect } from "vitest";
import { DefaultItemCreator } from "../creator";
import { KindKey, ItemArgsOfKind } from "@cnbn/schema";

describe("DefaultItemCreator", () => {
    const creator = new DefaultItemCreator();

    const testItemArgs = <K extends KindKey>(kind: K, name = "test"): ItemArgsOfKind<K> => {
        return {
            kind,
            path: ["root"],
            hash: "structure_hash",
            name,
        } as ItemArgsOfKind<K>;
    };

    it("should create base:generator item with default output pins", () => {
        const item = creator.create<"base:generator">({
            ...testItemArgs("base:generator"),
        });

        expect(item.kind).toBe("base:generator");
        expect(Object.keys(item.outputPins).length).toBe(1);
        expect(item.id).toBeTypeOf("string");
    });

    it("should respect numOfOutputs in base:generator item", () => {
        const item = creator.create<"base:generator">({
            ...testItemArgs("base:generator"),
            meta: { numOfOutputs: 3 },
        });

        expect(Object.keys(item.outputPins).length).toBe(3);
    });

    it("should create base:logic item with default input and output pins", () => {
        const item = creator.create<"base:logic">({
            ...testItemArgs("base:logic"),
        });

        expect(item.kind).toBe("base:logic");
        expect(Object.keys(item.inputPins).length).toBe(2);
        expect(Object.keys(item.outputPins).length).toBe(1);
    });

    it("should respect numOfInputs in base:logic item", () => {
        const item = creator.create<"base:logic">({
            ...testItemArgs("base:logic"),
            meta: { numOfInputs: 4 },
        });

        expect(Object.keys(item.inputPins).length).toBe(4);
    });

    it("should create base:display item with default input pins", () => {
        const item = creator.create<"base:display">({
            ...testItemArgs("base:display"),
        });

        expect(item.kind).toBe("base:display");
        expect(Object.keys(item.inputPins).length).toBe(1);
    });

    it("should create circuit:logic item using provided pins", () => {
        const item = creator.create<"circuit:logic">({
            ...testItemArgs("circuit:logic"),
            inputPins: {
                0: {
                    value: "1",
                    inputItems: [{ itemId: "a", pin: "0" }],
                },
            },
            outputPins: {
                0: { value: "0", outputItem: { itemId: "b", pin: "0" } },
            },
        });
        expect(item.kind).toBe("circuit:logic");
        expect(item.inputPins[0].value).toBe("1");
        expect(item.outputPins[0].value).toBe("0");

        expect(item.inputPins[0].inputItems?.[0]).toBeDefined();
        expect(item.outputPins[0].outputItem).toBeDefined();
    });

    it("should create circuit:logic with empty pins", () => {
        const item = creator.create<"circuit:logic">({
            ...testItemArgs("circuit:logic"),
            inputPins: {
                0: {},
            },
            outputPins: {
                0: {},
            },
        });

        expect(item.inputPins[0]).toBeDefined();
        expect(item.outputPins[0]).toBeDefined();

        expect(item.inputPins[0].inputItems).not.toBeDefined();
        expect(item.outputPins[0].outputItem).not.toBeDefined();
    });
});
