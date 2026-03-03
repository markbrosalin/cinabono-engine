import type { VisualStateResolver } from "../../../visual";
import { OFF_FILL, ON_FILL, SEGMENTS } from "./constant";

const getSegmentFill = (signal?: string): string => (signal === "1" ? ON_FILL : OFF_FILL);

export const resolveSevenSegState: VisualStateResolver<string> = (ctx) => {
    const signals = ctx.readSignals("input");
    const mask = SEGMENTS.map(([, pin]) => (signals[pin] === "1" ? "1" : "0")).join("");

    if (ctx.currentState === mask) return mask;

    ctx.node.setAttrs(
        Object.fromEntries(
            SEGMENTS.map(([segment, pin]) => [segment, { fill: getSegmentFill(signals[pin]) }]),
        ),
        { deep: true },
    );

    return mask;
};
