import { bringToFrontPlugin } from "./behavior";
import {
    edgeEditToolsPlugin,
    edgeLifecycleCachePlugin,
    nodeLifecycleCachePlugin,
    selectionPlugin,
} from "./tools";

export const plugins = [
    selectionPlugin,
    edgeLifecycleCachePlugin,
    edgeEditToolsPlugin,
    nodeLifecycleCachePlugin,
    bringToFrontPlugin,
];
