import { bringToFrontPlugin, nodeInteractionPlugin } from "./behavior";
import { edgeLifecycleCachePlugin, nodeLifecycleCachePlugin, visualLifecyclePlugin } from "./lifecycle";
import { edgeEditToolsPlugin, selectionPlugin } from "./tools";

export const plugins = [
    selectionPlugin,
    edgeLifecycleCachePlugin,
    edgeEditToolsPlugin,
    nodeLifecycleCachePlugin,
    visualLifecyclePlugin,
    bringToFrontPlugin,
    nodeInteractionPlugin,
];
