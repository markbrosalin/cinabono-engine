import { CinabonoBuilder } from "@engine/engine/builder";
import { describe, it } from "vitest";
import { SimpleApiPlugin } from "./plugin-examples/extend-api";
import { SimpleDepsPlugin } from "./plugin-examples/extend-deps";
import { SimpleEventLoggerPlugin } from "./plugin-examples/set-setup";

describe.skip("PluginPlayground", () => {
    it("test anything you want", async () => {
        // building the engine
        const Cinabono = await new CinabonoBuilder()
            .configure({
                ignoreErrorsSetup: true,
            })
            .use(SimpleApiPlugin, SimpleDepsPlugin, SimpleEventLoggerPlugin)
            .build();

        console.log(Cinabono.api.plugins.sayHello()); // log: Hello from SimpleApiPlugin!
    });
});
