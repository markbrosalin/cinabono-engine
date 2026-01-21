import { NodeProperties } from "@antv/x6";
import { BUFFER_NODE_NAME } from "../register/Nodes";
import { ItemBuilderResult } from "@cnbn/engine";
import { hasItemInputPins, hasItemOutputPins } from "@cnbn/schema";
import { XYCoords } from "@gately/shared/types";

type MapOptions = {
    position?: XYCoords;
};

export const encodePortId = (config: { side: "left" | "right"; id: string }): string => {
    const sideCode = config.side === "left" ? "L" : "R";
    return `${sideCode}:${config.id}`;
};

export const decodePortId = (portId: string): { side: "left" | "right"; id: string } => {
    const [sideCode, id] = portId.split(":");
    const side = sideCode === "L" ? "left" : "right";
    return { side, id };
};

const toPorts = (item: ItemBuilderResult["builtItem"]): NodeProperties["ports"] => {
    let inputs: string[] = [];
    let outputs: string[] = [];

    if (hasItemInputPins(item)) inputs = Object.keys(item.inputPins ?? {});
    if (hasItemOutputPins(item)) outputs = Object.keys(item.outputPins ?? {});

    return {
        items: [
            ...inputs.map((id) => ({
                id: encodePortId({ side: "left", id }),
                group: "left" as const,
            })),
            ...outputs.map((id) => ({
                id: encodePortId({ side: "right", id }),
                group: "right" as const,
            })),
        ],
    };
};

export const mapItemToNode = (result: ItemBuilderResult, options?: MapOptions): NodeProperties => {
    const item = result.builtItem;
    const pos = options?.position ?? { x: 120, y: 120 };

    return {
        id: item.id,
        shape: BUFFER_NODE_NAME,
        x: pos.x,
        y: pos.y,
        data: {
            hash: item.hash,
            path: item.path,
            kind: item.kind,
        },
        ports: toPorts(item),
    };
};
