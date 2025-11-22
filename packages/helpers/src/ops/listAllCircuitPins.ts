import { ItemOfKind } from "@cnbn/schema";
import { pinOps } from "../item";

export const listAllCircuitPins = (item: ItemOfKind) => {
    const inputs = pinOps(item).input.circuitPin.listAll();
    const outputs = pinOps(item).output.circuitPin.listAll();
    return {
        in: inputs,
        out: outputs,
    } as const;
};
