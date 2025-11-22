import type { DepsToken } from "@engine/deps";
import { definePlugin } from "@engine/plugins/definePlugin";

declare module "@engine/deps" {
    interface PluginDepsSpec {
        simpleMessage: DepsToken<string>;
    }
}

export const SimpleDepsPlugin = definePlugin("SimpleDepsPlugin", {
    deps: ({ token, config }) => ({
        tree: {
            simpleMessage: token("simple_message"),
        },

        configs: [
            config((t) => ({
                token: t.plugins.simpleMessage,
                useValue: "Hello from SimpleDepsPlugin!",
            })),
        ],
    }),
});
