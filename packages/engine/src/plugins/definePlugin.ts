import { EnginePlugin } from "@engine/plugins/types";

export const definePlugin = (name: string, plugin: Omit<EnginePlugin, "name">): EnginePlugin => ({
    name,
    ...plugin,
});
