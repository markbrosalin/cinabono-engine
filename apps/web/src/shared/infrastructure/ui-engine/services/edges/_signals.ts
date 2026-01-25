// import type { Edge } from "@antv/x6";
// import type { Node } from "@antv/x6/lib/model";
// import { LOGIC_VALUE_CLASSES, type LogicValueClass } from "@gately/shared/lib/logic-values";
// import { stripSignalClasses } from "../../adapters/ports";
// import { EDGE_STROKE_WIDTH } from "./constants";

// const getLogicValueClassFromPort = (node: Node, portId: string): LogicValueClass => {
//     const className = node.getPortProp<string>(portId, "attrs/circle/class");
//     const tokens = (className ?? "").split(/\s+/).filter(Boolean);
//     const found = LOGIC_VALUE_CLASSES.find((cls) => tokens.includes(cls));
//     return found ?? "value-x";
// };

// export const applyEdgeLogicValueFromSource = (
//     edge: Edge,
//     sourceCell?: Node | null,
//     sourcePort?: string | null,
// ) => {
//     if (!sourceCell || !sourcePort) return;
//     const signalClass = getLogicValueClassFromPort(sourceCell, sourcePort);
//     const current = edge.getAttrByPath<string>("line/class");
//     const base = stripSignalClasses(current) || "connection";

//     console.log(signalClass, current, base);
//     edge.setAttrByPath("line/class", `${base} ${signalClass}`.trim());
//     edge.setAttrByPath("line/strokeWidth", EDGE_STROKE_WIDTH);
//     // Keep stroke in sync as a fallback in case some global styles override classes.
//     const strokeVar =
//         signalClass === "value-true"
//             ? "var(--color-true)"
//             : signalClass === "value-false"
//               ? "var(--color-false)"
//               : signalClass === "value-hiz"
//                 ? "var(--color-hiz)"
//                 : "var(--color-x)";
//     edge.setAttrByPath("line/stroke", strokeVar);
// };
