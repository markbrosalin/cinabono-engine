import { ItemBuilderResult } from "@cnbn/engine";
import { hasItemInputPins, hasItemOutputPins } from "@cnbn/schema";
import type { LogicValue } from "@cnbn/schema";
import { XYCoords } from "@gately/shared/types";
import {
    buildInteractiveNodeAttrs,
    buildPortClass,
    encodePortId,
    logicValueToClass,
} from "../../../lib";
import type { PortMetadata } from "@antv/x6/lib/model/port";
import { UIEngineNodeProps } from "../../../model/types";
import {
    BUFFER_SPEC,
    getLogicNodeSpec,
    getLogicVisualPreset,
} from "../../../model/nodes-spec/logic";
import { calcNodeSize } from "./calcNodeSize";
import { STROKE_WIDTH } from "../../../model";

type MapOptions = {
    position?: XYCoords;
};

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

const readPrimaryPinValue = (item: ItemBuilderResult["builtItem"]): LogicValue | undefined => {
    if (item.hash === "TOGGLE" && hasItemOutputPins(item)) {
        const first = Object.keys(item.outputPins ?? {})[0];
        if (first != null) return item.outputPins[first]?.value;
    }

    if (item.hash === "LAMP" && hasItemInputPins(item)) {
        const first = Object.keys(item.inputPins ?? {})[0];
        if (first != null) return item.inputPins[first]?.value;
    }

    return;
};

export const buildNodeProps = (
    result: ItemBuilderResult,
    options?: MapOptions,
): UIEngineNodeProps => {
    const item = result.builtItem;
    const legacySpec = getLogicNodeSpec(item.hash);
    const visualPreset = getLogicVisualPreset(item.hash)?.preset;
    const minWidth = visualPreset?.minWidth ?? legacySpec?.minWidth ?? BUFFER_SPEC.minWidth;
    const minHeight = visualPreset?.minHeight ?? legacySpec?.minHeight ?? BUFFER_SPEC.minHeight;
    const shape = visualPreset?.nodeName ?? legacySpec?.nodeName ?? BUFFER_SPEC.nodeName;
    const inCount = hasItemInputPins(item) ? Object.keys(item.inputPins ?? {}).length : 0;
    const outCount = hasItemOutputPins(item) ? Object.keys(item.outputPins ?? {}).length : 0;
    const { width, height } = calcNodeSize({
        minWidth,
        minHeight,
        pinCount: Math.max(inCount, outCount),
    });
    const pos = options?.position ?? { x: 122, y: 122 };
    const interactiveAttrs = buildInteractiveNodeAttrs(item.hash, readPrimaryPinValue(item));

    return {
        id: item.id,
        shape,
        x: pos.x,
        y: pos.y,
        width: width + STROKE_WIDTH,
        height: height + STROKE_WIDTH,
        ...(interactiveAttrs ? { attrs: interactiveAttrs } : {}),
        data: {
            hash: item.hash,
            path: item.path,
            kind: item.kind,
        },
        ports: toPorts(item),
    };
};
