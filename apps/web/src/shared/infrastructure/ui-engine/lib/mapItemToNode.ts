import { ItemBuilderResult } from "@cnbn/engine";
import { hasItemInputPins, hasItemOutputPins } from "@cnbn/schema";
import { XYCoords } from "@gately/shared/types";
import { buildPortClass, encodePortId } from "./ports";
import type { PortMetadata } from "@antv/x6/lib/model/port";
import { resolveSignalClass } from "./signals";
import { UIEngineNodeProps } from "../model/types";
import { BUFFER_SPEC, getLogicNodeSpec } from "../presets-registry/nodes/spec/logic";

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
    const spec = getLogicNodeSpec(item.hash) ?? BUFFER_SPEC;
    const inCount = hasItemInputPins(item) ? Object.keys(item.inputPins ?? {}).length : 0;
    const outCount = hasItemOutputPins(item) ? Object.keys(item.outputPins ?? {}).length : 0;
    const { width, height } = calcNodeSize({
        minWidth: spec.minWidth,
        minHeight: spec.minHeight,
        pinCount: Math.max(inCount, outCount),
    });
    const pos = options?.position ?? { x: 120, y: 120 };

    return {
        id: item.id,
        shape: spec.nodeName,
        x: pos.x,
        y: pos.y,
        width,
        height,
        data: {
            hash: item.hash,
            path: item.path,
            kind: item.kind,
        },
        ports: toPorts(item),
    };
};
