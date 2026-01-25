import type { LogicValue } from "@cnbn/schema";
import type { EdgeRouterMode, SignalClass } from "./types";

export const NODE_PORT_LAYOUTS = {
    left: "logic-left",
    right: "logic-right",
} as const;

export const LOGIC_VALUE_CLASSES = ["value-true", "value-false", "value-x", "value-hiz"] as const;

export const CLASS_BY_LOGIC_VALUE: Record<LogicValue, SignalClass> = {
    "1": "value-true",
    "0": "value-false",
    X: "value-x",
    Z: "value-hiz",
    C: "value-x",
};

export const EDGE_ROUTER_MODES: EdgeRouterMode[] = ["manhattan", "metro"];
