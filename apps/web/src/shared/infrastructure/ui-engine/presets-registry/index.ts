import { registerNodes } from "./nodes/registerNodes";
import { registerNodePortLayouts } from "./ports/registerPortLayouts";

export const registerPresets = () => {
    registerNodes();
    registerNodePortLayouts();
};
