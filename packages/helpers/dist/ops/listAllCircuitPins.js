import { pinOps } from "../item/index.js";
export const listAllCircuitPins = (item) => {
    const inputs = pinOps(item).input.circuitPin.listAll();
    const outputs = pinOps(item).output.circuitPin.listAll();
    return {
        in: inputs,
        out: outputs,
    };
};
