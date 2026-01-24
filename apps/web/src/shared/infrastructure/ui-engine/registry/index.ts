import { registerNodes } from "./registerNodes";
import { registerPortLayouts } from "./registerPortLayouts";

export const registerAll = () => {
    registerNodes();
    registerPortLayouts();
};
