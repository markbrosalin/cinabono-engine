// import type { Graph } from "@antv/x6";
// import { decodePortId } from "../../adapters/ports";
// import { applyEdgeLogicValueFromSource } from "./signals";

// const getPortKind = (portId?: string | null): "input" | "output" | null => {
//     if (!portId) return null;
//     return decodePortId(portId).side === "right" ? "output" : "input";
// };

// export const bindEdgeSignals = (graph: Graph) => {
//     graph.on("edge:connected", ({ edge }) => {
//         const sourceCell = edge.getSourceCell();
//         const targetCell = edge.getTargetCell();
//         const sourcePort = edge.getSourcePortId();
//         const targetPort = edge.getTargetPortId();
//         if (!sourceCell || !targetCell || !sourcePort || !targetPort) return;
//         const sourceKind = getPortKind(sourcePort);
//         const targetKind = getPortKind(targetPort);
//         if (!sourceKind || !targetKind) return;
//         if (sourceKind === "input" && targetKind === "output") {
//             edge.setSource({ cell: targetCell.id, port: targetPort });
//             edge.setTarget({ cell: sourceCell.id, port: sourcePort });
//             // Swap changes terminals orientation; drop stale vertices/router artifacts from pre-swap drag.
//             edge.setVertices([]);
//             if (targetCell.isNode?.()) {
//                 applyEdgeLogicValueFromSource(edge, targetCell, targetPort);
//             }
//             return;
//         }
//         if (sourceCell.isNode?.()) {
//             applyEdgeLogicValueFromSource(edge, sourceCell, sourcePort);
//         }
//     });
// };
