import type { ValidateConnectionArgs } from "@antv/x6/lib/graph/options";
import { getPortKind } from "../ports";

/**
 * Normalizes a connection by validating port types and ensuring the correct directionality.
 *
 * If the source port is an input and target is an output (reversed connection),
 * swaps them so the output always connects to the input.
 *
 * @param args - The connection validation arguments containing source/target cells and ports
 * @returns An object with properly oriented inputCell, inputPort, outputCell, and outputPort,
 *          or null if ports are missing, invalid, or incompatible
 */
export const normalizeConnection = (args: ValidateConnectionArgs) => {
    const { sourceCell, targetCell, sourcePort, targetPort, sourceMagnet, targetMagnet } = args;

    if (!sourceCell || !targetCell || !sourcePort || !targetPort) return null;

    const sourceKind = getPortKind(sourcePort, sourceMagnet);
    const targetKind = getPortKind(targetPort, targetMagnet);

    if (!sourceKind || !targetKind) return null;

    if (sourceKind === "output" && targetKind === "input") {
        return {
            inputCell: targetCell,
            inputPort: targetPort,
            outputCell: sourceCell,
            outputPort: sourcePort,
        };
    }

    if (sourceKind === "input" && targetKind === "output") {
        return {
            inputCell: sourceCell,
            inputPort: sourcePort,
            outputCell: targetCell,
            outputPort: targetPort,
        };
    }

    return null;
};
