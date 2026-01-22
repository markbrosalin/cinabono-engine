import type { LogicValue } from "@cnbn/schema";

export type SignalClass = "signal-true" | "signal-false" | "signal-x" | "signal-hiz";

export const SIGNAL_CLASSES: SignalClass[] = [
    "signal-true",
    "signal-false",
    "signal-x",
    "signal-hiz",
];

const SIGNAL_CLASS_BY_VALUE: Record<LogicValue, SignalClass> = {
    "1": "signal-true",
    "0": "signal-false",
    X: "signal-x",
    Z: "signal-hiz",
    C: "signal-x",
};

export const toSignalClass = (value?: LogicValue | null): SignalClass => {
    if (!value) return "signal-x";
    return SIGNAL_CLASS_BY_VALUE[value] ?? "signal-x";
};
