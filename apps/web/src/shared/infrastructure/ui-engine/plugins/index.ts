import { bringToFrontPlugin, nodeInteractionPlugin } from "./behavior";
import {
    edgeLifecycleCachePlugin,
    nodeLifecycleCachePlugin,
    simulationNodeVisualPlugin,
    nodeVisualLifecyclePlugin,
} from "./lifecycle";
import { edgeEditToolsPlugin, selectionPlugin } from "./tools";

export const plugins = [
    selectionPlugin,
    edgeLifecycleCachePlugin,
    edgeEditToolsPlugin,
    nodeLifecycleCachePlugin,
    nodeVisualLifecyclePlugin,
    simulationNodeVisualPlugin,
    bringToFrontPlugin,
    nodeInteractionPlugin,
];
