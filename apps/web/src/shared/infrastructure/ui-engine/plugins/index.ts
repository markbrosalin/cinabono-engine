import { selectionPlugin, edgeEditToolsPlugin, edgeValueClassOnConnectPlugin } from "./tools";
import { bringToFrontPlugin } from "./behavior";

export const plugins = [
    selectionPlugin,
    edgeValueClassOnConnectPlugin,
    edgeEditToolsPlugin,
    bringToFrontPlugin,
];
