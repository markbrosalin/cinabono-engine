import type { Graph } from "@antv/x6";
import type { UIEngineContext } from "../model/types";
import { useNodeService } from "./nodes";
import { useSnapshotService } from "./snapshot";
import { useEdgeService } from "./edges";
import { usePortService } from "./ports";

export const buildServices = (graph: Graph, ctx: UIEngineContext) => ({
    edges: useEdgeService(graph, ctx),
    nodes: useNodeService(graph, ctx),
    ports: usePortService(graph, ctx),
    snapshot: useSnapshotService(graph, ctx),
});

export type UIEngineServices = ReturnType<typeof buildServices>;
