/* eslint-disable @typescript-eslint/no-explicit-any */
import { resolveEdgeEndpoints } from "../../lib";
import type { EdgeData, UIEnginePlugin } from "../../model/types";

export const edgeLifecycleCachePlugin: UIEnginePlugin = {
    name: "tools:edgeLifecycleCachePlugin",
    apply(graph, ctx) {
        const cache = ctx.getService("cache");
        const edgeMap = cache.edges;
        const portMap = cache.ports;

        const onEdgeConnected = (data: any) => {
            const domPath = data.view.container.querySelector("path.connection");
            if (!domPath) return;

            // save endpoints to edge data
            const edgeData = resolveEdgeEndpoints(data.edge);
            data.edge.setData(edgeData);

            if (!edgeData) {
                throw new Error(`[onEdgeConnected]: edgeData is undefined`);
            }
            // save edge to edgeMap
            edgeMap.save(data.edge, domPath);
            edgeMap.updateValue(data.edge, "value-hiz");

            portMap.updateEdge(edgeData.to.node, edgeData.to.portId, data.edge);
        };

        const onEdgeRemoved = (data: any) => {
            const edgeData = data.edge.getData() as EdgeData;
            portMap.removeEdge(edgeData.to.node, edgeData.to.portId);
            edgeMap.remove(data.edge);
        };

        graph.on("edge:connected", (data) => {
            onEdgeConnected(data);
        });

        graph.on("edge:removed", (data) => {
            onEdgeRemoved(data);
        });

        return () => {
            graph.off("edge:connected", onEdgeConnected);
            graph.off("edge:removed", onEdgeRemoved);
        };
    },
};
