import { BUFFER_NODE_NAME } from "../register/Nodes";
import { ItemBuilderResult } from "@cnbn/engine";
import { hasItemInputPins, hasItemOutputPins } from "@cnbn/schema";
import { XYCoords } from "@gately/shared/types";
import { buildPortClass, encodePortId, resolveSignalClass } from "./ports";
import type { UIEngineNodeProps } from "../types";
import { PortMetadata } from "@antv/x6/lib/model/port";

type MapOptions = {
    position?: XYCoords;
};

const toPorts = (item: ItemBuilderResult["builtItem"]): PortMetadata[] => {
    const ports: PortMetadata[] = [];

    if (hasItemInputPins(item)) {
        for (const [id, pin] of Object.entries(item.inputPins ?? {})) {
            const signalClass = resolveSignalClass(pin?.value);
            ports.push({
                id: encodePortId({ side: "left", id }),
                group: "left",
                attrs: {
                    circle: {
                        class: buildPortClass("input", signalClass),
                    },
                },
            });
        }
    }

    if (hasItemOutputPins(item)) {
        for (const [id, pin] of Object.entries(item.outputPins ?? {})) {
            const signalClass = resolveSignalClass(pin?.value);
            ports.push({
                id: encodePortId({ side: "right", id }),
                group: "right",
                attrs: {
                    circle: {
                        class: buildPortClass("output", signalClass),
                    },
                },
            });
        }
    }

    return ports;
};

export const mapItemToNode = (
    result: ItemBuilderResult,
    options?: MapOptions,
): UIEngineNodeProps => {
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
