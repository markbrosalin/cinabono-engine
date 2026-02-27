import { logicValueToClass, pinRefToPortId } from "../../lib";
import { SIMULATION_BATCH_APPLIED_EVENT } from "../../model/events";
import type { UIEnginePlugin } from "../../model/types";

const SIMULATION_UI_BATCH_NAME = "simulation:apply-ui";

export const simulationNodeVisualPlugin: UIEnginePlugin = {
    name: "lifecycle:simulationNodeVisual",
    apply(graph, ctx) {
        const edges = ctx.getService("edges");
        const ports = ctx.getService("ports");
        const nodeVisual = ctx.getService("node-visual");
        const eventBus = ctx.getService("eventBus");

        return eventBus.on(SIMULATION_BATCH_APPLIED_EVENT, ({ updates }) => {
            if (!updates.length) return;

            const touchedNodeIds = new Set<string>();
            graph.startBatch(SIMULATION_UI_BATCH_NAME);
            try {
                updates.forEach((update) => {
                    touchedNodeIds.add(update.elementId);

                    ports.setPortValue(update.elementId, update.pinRef, update.value);

                    if (update.pinRef.side !== "input") return;

                    edges.setIncomingPortValueClass(
                        update.elementId,
                        pinRefToPortId(update.pinRef),
                        logicValueToClass(update.value),
                    );
                });

                touchedNodeIds.forEach((nodeId) => {
                    nodeVisual.updateByNodeId(nodeId);
                });
            } finally {
                graph.stopBatch(SIMULATION_UI_BATCH_NAME);
            }
        });
    },
};
