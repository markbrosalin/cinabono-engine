import type { LogicValue } from "@cnbn/schema";
import type { VisualStateResolver } from "./types";

const pickPrimarySignal = (
    signals: Record<string, LogicValue | undefined>,
): LogicValue | undefined => {
    const first = Object.keys(signals)[0];
    if (first == null) return;
    return signals[first];
};

type BinaryVisualState = "on" | "off";

export const resolveSingleBinaryOutputState: VisualStateResolver<BinaryVisualState> = (ctx) => {
    const value = pickPrimarySignal(ctx.readSignals("output"));
    if (value === "1") return "on";
    if (value === "0") return "off";
    return "off";
};

export const resolveSingleInputState: VisualStateResolver<"true" | "false" | "x" | "hiz"> = (
    ctx,
) => {
    const value = pickPrimarySignal(ctx.readSignals("input"));
    if (value === "1") return "true";
    if (value === "0") return "false";
    if (value === "Z") return "hiz";
    return "x";
};
