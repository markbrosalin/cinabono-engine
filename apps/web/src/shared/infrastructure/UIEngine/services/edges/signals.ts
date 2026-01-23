import type { Edge } from "@antv/x6";
import type { Node } from "@antv/x6/lib/model";
import { SIGNAL_CLASSES, type SignalClass } from "@gately/shared/lib/signal";
import { stripSignalClasses } from "../../adapters/ports";
import { EDGE_STROKE_WIDTH } from "./constants";

const getSignalClassFromPort = (node: Node, portId: string): SignalClass => {
    const className = node.getPortProp<string>(portId, "attrs/circle/class");
    const tokens = (className ?? "").split(/\s+/).filter(Boolean);
    const found = SIGNAL_CLASSES.find((cls) => tokens.includes(cls));
    return found ?? "signal-x";
};

export const applyEdgeSignalFromSource = (
    edge: Edge,
    sourceCell?: Node | null,
    sourcePort?: string | null,
) => {
    if (!sourceCell || !sourcePort) return;
    const signalClass = getSignalClassFromPort(sourceCell, sourcePort);
    const current = edge.getAttrByPath<string>("line/class");
    const base = stripSignalClasses(current) || "connection";

    console.log(signalClass, current, base);
    edge.setAttrByPath("line/class", `${base} ${signalClass}`.trim());
    edge.setAttrByPath("line/strokeWidth", EDGE_STROKE_WIDTH);
    // Keep stroke in sync as a fallback in case some global styles override classes.
    const strokeVar =
        signalClass === "signal-true"
            ? "var(--color-true)"
            : signalClass === "signal-false"
              ? "var(--color-false)"
              : signalClass === "signal-hiz"
                ? "var(--color-hiz)"
                : "var(--color-x)";
    edge.setAttrByPath("line/stroke", strokeVar);
};
