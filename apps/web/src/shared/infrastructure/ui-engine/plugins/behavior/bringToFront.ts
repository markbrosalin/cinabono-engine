/* eslint-disable @typescript-eslint/no-explicit-any */
import type { UIEnginePlugin } from "../../model/types";

export const bringToFrontPlugin: UIEnginePlugin = {
    name: "behavior:bringToFront",
    apply(graph, _ctx) {
        const onNodeMouseDown = (_data: any) => {
            console.log("CLicked");
        };

        graph.on("node:click", (data) => {
            onNodeMouseDown(data);
        });

        return () => {
            graph.off("node:mousedown", onNodeMouseDown);
        };
    },
};
