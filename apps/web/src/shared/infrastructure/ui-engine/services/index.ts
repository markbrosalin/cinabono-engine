import type { Graph } from "@antv/x6";
import type { UIEngineContext } from "../model/types";
import { graphService } from "./graph/api";
import { nodesService } from "./nodes/api";
import { edgesService } from "./edges/api";

export const buildServices = (graph: Graph, ctx: UIEngineContext) => ({
    graph: graphService(graph, ctx),
    nodes: nodesService(graph, ctx),
    edges: edgesService(graph, ctx),
});
