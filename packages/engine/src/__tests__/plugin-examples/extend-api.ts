import type { ApiToken } from "@engine/api";
import { definePlugin } from "@engine/plugins";

declare module "@engine/api" {
    interface PluginApiSpec {
        sayHello: ApiToken<() => string, "public">;
    }
}

export const SimpleApiPlugin = definePlugin("SimpleApiPlugin", {
    api: ({ token, config }) => ({
        tree: {
            sayHello: token("say_hello", "public"),
        },

        configs: [
            config((t) => ({
                token: t.plugins.sayHello,

                factory: (ctx) => {
                    function say(): string {
                        return ctx.deps.plugins.simpleMessage;
                    }
                    return say;
                },

                // here we can add local wrappers for current use-case if needed
                wrappedBy: [
                    /*WrapperExample*/
                ],
            })),
        ],
    }),
    wrappers: [], // here we can add global wrappers for all use-cases if needed
});
