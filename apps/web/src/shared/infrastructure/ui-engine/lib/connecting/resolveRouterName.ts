import type { Graph } from "@antv/x6";
import type { EdgeRouterMode } from "../../model/types";

export const resolveRouterName = (graph: Graph, fallback: EdgeRouterMode): EdgeRouterMode => {
    const router = graph.options.connecting?.router;
    if (!router) return fallback;
    if (typeof router === "string") return router as EdgeRouterMode;
    if (typeof router === "object" && "name" in router)
        return (router.name ?? fallback) as EdgeRouterMode;
    return fallback;
};
