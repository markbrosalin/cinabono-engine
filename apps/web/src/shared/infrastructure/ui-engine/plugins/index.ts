import { selectionPlugin } from "./tools/selection";
import { edgeSignalsPlugin } from "./tools/edgeSignals";
import { edgeEditToolsPlugin } from "./tools/edgeEditTools";
import { bringToFrontPlugin } from "./behavior/bringToFront";
import { portToFrontPlugin } from "./behavior/portToFront";

export const plugins = [
    selectionPlugin,
    edgeSignalsPlugin,
    edgeEditToolsPlugin,
    bringToFrontPlugin,
    portToFrontPlugin,
];
