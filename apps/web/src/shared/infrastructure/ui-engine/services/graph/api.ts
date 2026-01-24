import type { Graph } from "@antv/x6";
import type { UIEngineContext } from "../../model/types";

export const graphService = (_graph: Graph, _ctx: UIEngineContext) => {
    return {
        // TODO: expose graph-level helpers (zoom, translate, fit, getState)
    };
};
