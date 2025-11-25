/* eslint-disable no-console */
import { defineUseCase, defineWrapper } from "../../api/helpers/factories";
import { ApiRegistry } from "../../api/registry/registry";
import { CORE_API_SPEC } from "../../api/spec";
import { DefaultEngineEventBus } from "../../eventBus/eventBus";
import { createDIConfig } from "@repo/di";
import { describe, it } from "vitest";
const colors = {
    green: (t) => `\x1b[32m${t}\x1b[0m`,
};
export const TreeWrapper = defineWrapper("human", (ctx, next) => {
    const indent = (depth = ctx.meta.depth) => "│ ".repeat(depth ?? 0);
    console.log(colors.green(`${indent()}`));
    console.log(colors.green(`${indent()}┌─ [${ctx.meta.ucName}] — wrapper:${ctx.meta.path} ("human")`));
    console.log(colors.green(`${indent()}│  trace=${ctx.meta.traceId}  span=${ctx.meta.spanId}`));
    const result = next();
    console.log(colors.green(`${indent()}└─ [${ctx.meta.ucName}] done (HUMAN) result: ${result}`));
    return result;
});
const addUC = defineUseCase({
    factory: (_ctx) => {
        const add = ((a, b) => {
            _ctx.api.math.sub(2, 2);
            if (typeof a === "string")
                return String(a) + String(b);
            return Number(a) + Number(b);
        });
        return add;
    },
    wrappedBy: [TreeWrapper],
});
const subUC = defineUseCase({
    factory: (_ctx) => {
        const sub = ((a, b) => {
            _ctx.api.math.add(2, 2);
            if (typeof a === "string")
                return "Invalid operation with strings!";
            return Number(a) - Number(b);
        });
        return sub;
    },
    wrappedBy: [TreeWrapper],
});
const bus = new DefaultEngineEventBus();
const reg = new ApiRegistry({
    bus,
    apiSpec: CORE_API_SPEC,
    options: {
        maxLoopDepth: 5,
        allowOverride: true,
    },
});
reg.register("/math/add", addUC);
reg.register("/math/sub", subUC);
const { api } = reg.buildApi();
describe("ApiRegistry", () => {
    it("test", async () => {
        console.log(createDIConfig.toString());
        // api.math.add(2, 2);
        // const c = await buildEngineContainer();
        // console.log(c);
        // console.log(c.resolve(DEPS_TOKENS.core.bus));
    });
});
