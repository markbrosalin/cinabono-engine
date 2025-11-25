import { makeBaseDisplayEntry, makeBaseGeneratorEntry, makeBaseLogicEntry } from "./builders";
export const toggleEntry = makeBaseGeneratorEntry("TOGGLE");
export const pushButtonEntry = makeBaseGeneratorEntry("PUSH_BUTTON");
export const falseConstantEntry = makeBaseGeneratorEntry("FALSE_CONSTANT");
export const trueConstantEntry = makeBaseGeneratorEntry("TRUE_CONSTANT");
export const clockEntry = makeBaseGeneratorEntry("CLOCK");
export const lampEntry = makeBaseDisplayEntry("LAMP");
export const bufferEntry = makeBaseLogicEntry("BUFFER");
export const notEntry = makeBaseLogicEntry("NOT");
export const andEntry = makeBaseLogicEntry("AND");
export const orEntry = makeBaseLogicEntry("OR");
export const norEntry = makeBaseLogicEntry("NOR");
export const nandEntry = makeBaseLogicEntry("NAND");
export const xorEntry = makeBaseLogicEntry("XOR");
export const xnorEntry = makeBaseLogicEntry("XNOR");
export const rsTriggerEntry = {
    hash: "RS-TRIGGER",
    kind: "circuit:logic",
    name: "RS-TRIGGER",
    inputPins: {
        0: { inputItems: [{ itemId: "NOR_0", pin: "0" }] },
        1: { inputItems: [{ itemId: "NOR_1", pin: "1" }] },
    },
    outputPins: {
        0: { outputItem: { itemId: "NOR_0", pin: "0" } },
        1: { outputItem: { itemId: "NOR_1", pin: "0" } },
    },
    items: {
        NOR_0: {
            hash: "NOR",
            kind: "base:logic",
            name: "NOR",
            inputLinks: { 1: "NOR_1:0:NOR_0:1" },
            outputLinks: { 0: ["NOR_0:0:NOR_1:0"] },
        },
        NOR_1: {
            hash: "NOR",
            kind: "base:logic",
            name: "NOR",
            inputLinks: { 0: "NOR_0:0:NOR_1:0" },
            outputLinks: { 0: ["NOR_1:0:NOR_0:1"] },
        },
    },
};
