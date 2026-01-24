import type { Connecting } from "@antv/x6/lib/graph/options";

export type EdgeRouterMode = "manhattan" | "metro";

export const createConnectingConfig = (
    routerMode: EdgeRouterMode = "manhattan",
): Partial<Connecting> => ({
    // TODO: move existing createConnectingConfig implementation here (from legacy UIEngine/services/edges/connecting.ts)
    router: { name: routerMode },
});
