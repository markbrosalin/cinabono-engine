import { registerNodes } from "./registerNodes";
import { registerNodePortLayouts } from "./registerPortLayouts";

export const registerPresets = () => {
    registerNodes();
    registerNodePortLayouts();
};
