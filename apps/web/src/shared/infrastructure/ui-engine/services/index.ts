import type { Graph } from "@antv/x6";
import { resolveDependencyOrder } from "../lib/registry/resolveDependencyOrder";
import type { UIEngineContext } from "../model/types";
import { useNodeService } from "./nodes";
import { useSnapshotService } from "./snapshot";
import { useEdgeService } from "./edges";
import { usePortService } from "./ports";
import { useSignalService } from "./signals";
import { useVisualService } from "./node-visual";
import { useCacheService } from "./cache";
import { useEventBusService } from "./event-bus";

const serviceFactories = {
    cache: useCacheService,
    eventBus: useEventBusService,
    edges: useEdgeService,
    nodes: useNodeService,
    ports: usePortService,
    "node-visual": useVisualService,
    signals: useSignalService,
    snapshot: useSnapshotService,
} as const;

export type UIEngineServiceName = keyof typeof serviceFactories;
type UIEngineServiceFactoryMap = typeof serviceFactories;

type UIEngineServiceDefinitionMap = {
    [K in UIEngineServiceName]: {
        create: UIEngineServiceFactoryMap[K];
        initDeps?: readonly UIEngineServiceName[];
        uses?: readonly UIEngineServiceName[];
    };
};

const serviceDefinitions: UIEngineServiceDefinitionMap = {
    cache: {
        create: serviceFactories.cache,
    },
    eventBus: {
        create: serviceFactories.eventBus,
    },
    edges: {
        create: serviceFactories.edges,
        initDeps: ["cache"],
        uses: ["nodes"],
    },
    nodes: {
        create: serviceFactories.nodes,
        uses: ["node-visual"],
    },
    ports: {
        create: serviceFactories.ports,
        initDeps: ["cache"],
    },
    "node-visual": {
        create: serviceFactories["node-visual"],
        uses: ["nodes", "ports"],
    },
    signals: {
        create: serviceFactories.signals,
        uses: ["eventBus"],
    },
    snapshot: {
        create: serviceFactories.snapshot,
    },
};

export type UIEngineServices = {
    [K in UIEngineServiceName]: ReturnType<UIEngineServiceFactoryMap[K]>;
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

    const orderedDefinitions = resolveDependencyOrder(
        (Object.keys(serviceDefinitions) as UIEngineServiceName[]).map((name) => ({
            name,
            deps: serviceDefinitions[name].initDeps,
            value: serviceDefinitions[name],
        })),
    );

    orderedDefinitions.forEach(({ name, value }) => {
        (registry as Record<UIEngineServiceName, unknown>)[name] = value.create(graph, engineCtx);
    });

    return registry as UIEngineServices;
};
