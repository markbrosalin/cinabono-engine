import { Hash } from "@cnbn/schema";
import { BakeTable } from "../../model/types";

export const defaultBakeMap = new Map<Hash, BakeTable>([
    ["TEST_AND", ["0", "0", "0", "1"]],
    ["TEST_OR", ["0", "1", "1", "1"]],
]);
