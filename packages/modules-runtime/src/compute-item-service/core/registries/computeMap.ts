import { ComputeFunction } from "../../model/types";
import * as Fn from "./computeFns";
import { Hash } from "@cnbn/schema";

export const defaultComputeMap = new Map<Hash, ComputeFunction>([
    ["BUFFER", Fn.computeBUFFER],
    ["NOT", Fn.computeNOT],
    ["AND", Fn.computeAND],
    ["OR", Fn.computeOR],
    ["NOR", Fn.computeNOR],
    ["NAND", Fn.computeNAND],
    ["XOR", Fn.computeXOR],
    ["XNOR", Fn.computeXNOR],
]);
