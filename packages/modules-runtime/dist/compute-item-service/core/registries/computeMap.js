import * as Fn from "./computeFns.js";
export const defaultComputeMap = new Map([
    ["BUFFER", Fn.computeBUFFER],
    ["NOT", Fn.computeNOT],
    ["AND", Fn.computeAND],
    ["OR", Fn.computeOR],
    ["NOR", Fn.computeNOR],
    ["NAND", Fn.computeNAND],
    ["XOR", Fn.computeXOR],
    ["XNOR", Fn.computeXNOR],
]);
