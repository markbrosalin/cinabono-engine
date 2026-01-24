import type { UIEnginePlugin } from "../../model/types";
import { applyEdgeSignalFromSource } from "../../../UIEngine/services/edges/signals"; // TODO: relocate signals into ui-engine/services

export const edgeSignalsPlugin: UIEnginePlugin = {
    name: "tools:edgeSignals",
    apply(graph) {
        const onEdgeConnected = ({ edge }: any) => {
            const sourceCell = edge.getSourceCell();
            const sourcePort = edge.getSourcePortId();
            if (!sourceCell || !sourceCell.isNode?.()) return;
            applyEdgeSignalFromSource(edge, sourceCell, sourcePort);
        };

        graph.on("edge:connected", onEdgeConnected);

        return () => {
            graph.off("edge:connected", onEdgeConnected);
        };
    },
};
