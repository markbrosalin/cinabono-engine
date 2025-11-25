import * as E from "./defaultItems";
export const defaultTemplatesMap = new Map([
    ["TOGGLE", E.toggleEntry],
    ["PUSH_BUTTON", E.pushButtonEntry],
    ["FALSE_CONSTANT", E.falseConstantEntry],
    ["TRUE_CONSTANT", E.trueConstantEntry],
    ["CLOCK", E.clockEntry],
    ["LAMP", E.lampEntry],
    ["BUFFER", E.bufferEntry],
    ["NOT", E.notEntry],
    ["AND", E.andEntry],
    ["OR", E.orEntry],
    ["NAND", E.nandEntry],
    ["NOR", E.norEntry],
    ["XOR", E.xorEntry],
    ["XNOR", E.xnorEntry],
    ["RS-TRIGGER", E.rsTriggerEntry],
]);
