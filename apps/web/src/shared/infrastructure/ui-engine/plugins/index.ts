import type { Graph } from "@antv/x6";
import {
    applyDependencyDefinitions,
    type OrderedDependencyDefinition,
} from "../lib/registry/applyDependencyDefinitions";
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

type UIEnginePluginDefinition = OrderedDependencyDefinition<string, UIEngineServiceName> & {
    plugin: UIEnginePlugin;
};

const pluginDefinitions: UIEnginePluginDefinition[] = [
    {
        name: selectionPlugin.name,
        plugin: selectionPlugin,
    },
    {
        name: edgeLifecycleCachePlugin.name,
        plugin: edgeLifecycleCachePlugin,
        requiredDeps: ["cache"],
    },
    {
        name: edgeEditToolsPlugin.name,
        plugin: edgeEditToolsPlugin,
        after: [selectionPlugin.name],
    },
    {
        name: nodeLifecycleCachePlugin.name,
        plugin: nodeLifecycleCachePlugin,
        requiredDeps: ["cache"],
    },
    {
        name: nodeVisualLifecyclePlugin.name,
        plugin: nodeVisualLifecyclePlugin,
        requiredDeps: ["node-visual"],
    },
    {
        name: simulationNodeVisualPlugin.name,
        plugin: simulationNodeVisualPlugin,
        requiredDeps: ["edges", "ports", "node-visual", "eventBus"],
    },
    {
        name: nodeInteractionPlugin.name,
        plugin: nodeInteractionPlugin,
    },
];

export const applyPlugins = (graph: Graph, ctx: UIEngineContext): Array<() => void> => {
    return applyDependencyDefinitions<string, UIEngineServiceName, UIEnginePluginDefinition>({
        definitions: pluginDefinitions,
        assertDependency: (name) => {
            ctx.getService(name);
        },
        apply: (definition) => definition.plugin.apply(graph, ctx),
    });
};
