/* eslint-disable @typescript-eslint/no-explicit-any */
import type { UIEnginePlugin } from "../../model/types";
import { usePortStateMap } from "../../presets-registry/usePortStateMap";

export const nodeLifecycleCachePlugin: UIEnginePlugin = {
    name: "tools:nodeLifecycleCachePlugin",
    apply(graph) {
        const map = usePortStateMap();

        const onNodeRemoved = (data: any) => {
            map.removeNode(data.node);
        };

        graph.on("node:removed", (data) => {
            onNodeRemoved(data);
        });

        return () => {
            graph.off("node:removed", onNodeRemoved);
        };
    },
};
