import type { Graph } from "@antv/x6";
import { resolveDependencyOrder } from "../lib/registry/resolveDependencyOrder";
import type { UIEngineContext, UIEnginePlugin } from "../model/types";
import { nodeInteractionPlugin } from "./behavior";
import {
    edgeLifecycleCachePlugin,
    nodeLifecycleCachePlugin,
    simulationNodeVisualPlugin,
    nodeVisualLifecyclePlugin,
} from "./lifecycle";
import { edgeEditToolsPlugin, selectionPlugin } from "./tools";
import type { UIEngineServiceName } from "../services";

type UIEnginePluginDefinition = {
    plugin: UIEnginePlugin;
    after?: readonly string[];
    requiresServices?: readonly UIEngineServiceName[];
};

const pluginDefinitions: UIEnginePluginDefinition[] = [
    {
        plugin: selectionPlugin,
    },
    {
        plugin: edgeLifecycleCachePlugin,
        requiresServices: ["cache"],
    },
    {
        plugin: edgeEditToolsPlugin,
        after: [selectionPlugin.name],
    },
    {
        plugin: nodeLifecycleCachePlugin,
        requiresServices: ["cache"],
    },
    {
        plugin: nodeVisualLifecyclePlugin,
        requiresServices: ["node-visual"],
    },
    {
        plugin: simulationNodeVisualPlugin,
        requiresServices: ["edges", "ports", "node-visual", "eventBus"],
    },
    {
        plugin: nodeInteractionPlugin,
    },
];

const resolvePluginDefinitions = (): UIEnginePluginDefinition[] => {
    return resolveDependencyOrder(
        pluginDefinitions.map((definition) => ({
            name: definition.plugin.name,
            deps: definition.after,
            value: definition,
        })),
    ).map((entry) => entry.value);
};

export const applyPlugins = (graph: Graph, ctx: UIEngineContext): Array<() => void> => {
    const disposers: Array<() => void> = [];

    resolvePluginDefinitions().forEach((definition) => {
        definition.requiresServices?.forEach((name) => {
            ctx.getService(name);
        });

        const dispose = definition.plugin.apply(graph, ctx);
        if (typeof dispose === "function") {
            disposers.push(dispose);
        }
    });

    return disposers;
};
