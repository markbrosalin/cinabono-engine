/* eslint-disable @typescript-eslint/no-explicit-any */
import { getPortKind } from "../../lib";
import { applyEdgeValueClassFromMagnet } from "../../lib/logic-values";
import type { UIEnginePlugin } from "../../model/types";

export const edgeValueClassOnConnectPlugin: UIEnginePlugin = {
    name: "tools:edgeValueClassOnConnect",
    apply(graph) {
        const onEdgeConnected = ({ edge, currentMagnet, currentPort }: any) => {
            if (getPortKind(currentPort) === "output")
                applyEdgeValueClassFromMagnet(edge, currentMagnet);
        };

        graph.on("edge:connected", onEdgeConnected);

        return () => {
            graph.off("edge:connected", onEdgeConnected);
        };
    },
};
