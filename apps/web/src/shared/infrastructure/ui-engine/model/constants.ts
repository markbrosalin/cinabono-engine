import type { LogicValue } from "@cnbn/schema";
import { SignalClass } from "./types";

export const NODE_PORT_LAYOUTS = {
    left: "logic-left",
    right: "logic-right",
} as const;

export const SIGNAL_CLASSES = ["signal-true", "signal-false", "signal-x", "signal-hiz"] as const;

export const SIGNAL_CLASS_BY_VALUE: Record<LogicValue, SignalClass> = {
    "1": "signal-true",
    "0": "signal-false",
    X: "signal-x",
    Z: "signal-hiz",
    C: "signal-x",
};
