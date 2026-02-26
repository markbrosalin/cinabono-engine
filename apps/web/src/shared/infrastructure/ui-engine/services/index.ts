import type { Graph } from "@antv/x6";
import type { UIEngineContext } from "../model/types";
import { useNodeService } from "./nodes";
import { useSnapshotService } from "./snapshot";
import { useEdgeService } from "./edges";
import { usePortService } from "./ports";
import { useSignalService } from "./signals";
import { useVisualService } from "./visual";
import { useCacheService } from "./cache";

const serviceFactories = {
    cache: useCacheService,
    edges: useEdgeService,
    nodes: useNodeService,
    ports: usePortService,
    signals: useSignalService,
    visual: useVisualService,
    snapshot: useSnapshotService,
} as const;

export type UIEngineServiceName = keyof typeof serviceFactories;

export type UIEngineServices = {
    [K in UIEngineServiceName]: ReturnType<(typeof serviceFactories)[K]>;
};

const createServiceGetter = (registry: Partial<UIEngineServices>) => {
    return <K extends UIEngineServiceName>(name: K): UIEngineServices[K] => {
        const service = registry[name];
        if (!service) {
            throw new Error(`[UIEngine] service "${String(name)}" is not initialized`);
        }
        return service;
    };
};

export const buildServices = (graph: Graph, engineCtx: UIEngineContext): UIEngineServices => {
    const registry: Partial<UIEngineServices> = {};
    const getService = createServiceGetter(registry);
    engineCtx.getService = (name) => getService(name);

    const initService = <K extends UIEngineServiceName>(name: K): void => {
        const factory = serviceFactories[name];
        registry[name] = factory(graph, engineCtx) as UIEngineServices[K];
    };

    (Object.keys(serviceFactories) as UIEngineServiceName[]).forEach((name) => initService(name));

    return registry as UIEngineServices;
};
