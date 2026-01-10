import {
    computeAND,
    computeOR,
    computeNOT,
    computeBUFFER,
    computeNAND,
    computeNOR,
    computeXOR,
    computeXNOR,
    ComputeStoreContract,
} from "@gately/domain-model/modules/compute";

export const computesMap: ComputeStoreContract["_storeMap"] = new Map([
    ["BUFFER", { hash: "BUFFER", subCategory: "LOGIC", computeFn: computeBUFFER }],
    ["NOT", { hash: "NOT", subCategory: "LOGIC", computeFn: computeNOT }],
    ["AND", { hash: "AND", subCategory: "LOGIC", computeFn: computeAND }],
    ["OR", { hash: "OR", subCategory: "LOGIC", computeFn: computeOR }],
    ["NAND", { hash: "NAND", subCategory: "LOGIC", computeFn: computeNAND }],
    ["NOR", { hash: "NOR", subCategory: "LOGIC", computeFn: computeNOR }],
    ["XOR", { hash: "XOR", subCategory: "LOGIC", computeFn: computeXOR }],
    ["XNOR", { hash: "XNOR", subCategory: "LOGIC", computeFn: computeXNOR }],
]);
