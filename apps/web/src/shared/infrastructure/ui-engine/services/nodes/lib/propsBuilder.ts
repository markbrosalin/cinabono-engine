import { ItemBuilderResult } from "@cnbn/engine";
import { hasItemInputPins, hasItemOutputPins } from "@cnbn/schema";
import { XYCoords } from "@gately/shared/types";
import { buildPortClass, encodePortId, logicValueToClass } from "../../../lib";
import type { PortMetadata } from "@antv/x6/lib/model/port";
import { UIEngineNodeProps } from "../../../model/types";
import type { AnyVisualBinding } from "../../../model/visual";
import { calcNodeSize } from "./calcNodeSize";
import { STROKE_WIDTH } from "../../../model";

type MapOptions = {
    position?: XYCoords;
};

export type BuildNodePropsDeps = {
    getVisualBinding: (hash: string) => AnyVisualBinding | undefined;
};

const FALLBACK_PRESET_HASH = "BUFFER";
const FALLBACK_NODE_NAME = "buffer";
const FALLBACK_MIN_WIDTH = 64;
const FALLBACK_MIN_HEIGHT = 32;

const toPorts = (item: ItemBuilderResult["builtItem"]): PortMetadata[] => {
    const ports: PortMetadata[] = [];

    if (hasItemInputPins(item)) {
        const inputGroup = item.hash === "LAMP" ? "bottom" : "left";

        for (const [id, pin] of Object.entries(item.inputPins ?? {})) {
            const signalClass = logicValueToClass(pin?.value);
            ports.push({
                id: encodePortId({ side: "left", id }),
                group: inputGroup,
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
            const signalClass = logicValueToClass(pin?.value);
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

export const buildNodeProps = (
    result: ItemBuilderResult,
    options?: MapOptions,
    deps?: BuildNodePropsDeps,
): UIEngineNodeProps => {
    const item = result.builtItem;
    const getBinding = deps?.getVisualBinding;
    const fallbackHash = FALLBACK_PRESET_HASH;
    const fallbackPreset = getBinding?.(fallbackHash)?.preset;
    const visualPreset = getBinding?.(item.hash)?.preset;
    const minWidth = visualPreset?.minWidth ?? fallbackPreset?.minWidth ?? FALLBACK_MIN_WIDTH;
    const minHeight = visualPreset?.minHeight ?? fallbackPreset?.minHeight ?? FALLBACK_MIN_HEIGHT;
    const shape = visualPreset?.nodeName ?? fallbackPreset?.nodeName ?? FALLBACK_NODE_NAME;
    const inCount = hasItemInputPins(item) ? Object.keys(item.inputPins ?? {}).length : 0;
    const outCount = hasItemOutputPins(item) ? Object.keys(item.outputPins ?? {}).length : 0;
    const { width, height } = calcNodeSize({
        minWidth,
        minHeight,
        pinCount: Math.max(inCount, outCount),
    });
    const pos = options?.position ?? { x: 122, y: 122 };

    return {
        id: item.id,
        shape,
        x: pos.x,
        y: pos.y,
        width: width + STROKE_WIDTH,
        height: height + STROKE_WIDTH,
        data: {
            hash: item.hash,
            path: item.path,
            kind: item.kind,
        },
        ports: toPorts(item),
    };
};
