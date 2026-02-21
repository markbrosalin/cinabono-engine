/* eslint-disable @typescript-eslint/no-explicit-any */
import type { UIEnginePlugin } from "../../model/types";
import { useEdgeStateMap } from "../../presets-registry/useEdgeStateMap";

export const edgeLifecycleCachePlugin: UIEnginePlugin = {
    name: "tools:edgeLifecycleCachePlugin",
    apply(graph) {
        const map = useEdgeStateMap();

        const onEdgeConnected = (data: any) => {
            const path = data.view.container.querySelector("path.connection");
            if (!path) return;

            map.save(data.edge, path);
            map.updateValue(data.edge, "value-hiz");
        };

        const onEdgeRemoved = (data: any) => {
            map.remove(data.edge);
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
