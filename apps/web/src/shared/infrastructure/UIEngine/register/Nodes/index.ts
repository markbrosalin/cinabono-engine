import { registerBufferNode } from "./Buffer";

let registered = false;

export const registerDefaultNodes = () => {
    if (registered) return;
    registerBufferNode();
    registered = true;
};

export { BUFFER_NODE_NAME } from "./Buffer";
