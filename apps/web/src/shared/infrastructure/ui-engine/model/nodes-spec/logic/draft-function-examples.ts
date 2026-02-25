import type { LogicValue } from "@cnbn/schema";
import type { VisualStateResolver } from "../../visual";

const pickPrimaryValue = (
    signals: Record<string, LogicValue | undefined>,
): LogicValue | undefined => {
    const first = Object.keys(signals)[0];
    if (first == null) return;
    return signals[first];
};

type BinaryVisualState = "on" | "off";

// Reusable resolver for binary elements (toggle, button-like display).
export const resolveSinglaBinaryOutputState: VisualStateResolver<BinaryVisualState> = (ctx) => {
    const value = pickPrimaryValue(ctx.readSignals("output"));
    if (value === "1") return "on";
    if (value === "0") return "off";
    return "off";
};

// Reusable resolver for single-pin lamp-like displays.
export const resolveSingleInputState: VisualStateResolver<"true" | "false" | "x" | "hiz"> = (
    ctx,
) => {
    const value = pickPrimaryValue(ctx.readSignals("input"));
    if (value === "1") return "true";
    if (value === "0") return "false";
    if (value === "Z") return "hiz";
    return "x";
};
