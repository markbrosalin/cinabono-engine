import type { LogicValue } from "@cnbn/schema";
import type { EdgeRouterMode, LogicValueClass } from "./types";

export const NODE_PORT_LAYOUTS = {
    left: "logic-left",
    right: "logic-right",
    bottom: "logic-bottom",
} as const;

export const LOGIC_VALUE_CLASSES = ["value-true", "value-false", "value-x", "value-hiz"] as const;

export const CLASS_BY_LOGIC_VALUE: Record<LogicValue, LogicValueClass> = {
    "1": "value-true",
    "0": "value-false",
    X: "value-x",
    Z: "value-hiz",
    C: "value-x",
};

export const LOGIC_VALUE_BY_CLASS: Record<LogicValueClass, LogicValue> = {
    "value-true": "1",
    "value-false": "0",
    "value-hiz": "Z",
    "value-x": "X",
};

export const EDGE_ROUTER_MODES: EdgeRouterMode[] = ["manhattan", "metro"];

export const DEFAULT_VALUE_CLASS = "value-x";
