import { defineUseCase } from "../api/helpers/factories";
import { ApiRegistry } from "../api/registry/registry";
import { CORE_API_SPEC } from "../api/spec";
import { DefaultEngineEventBus } from "../eventBus/eventBus";
const addUC = defineUseCase({
    factory: (_ctx) => {
        const add = ((a, b) => {
            if (typeof a === "string")
                return String(a) + String(b);
            return Number(a) + Number(b);
        });
        return add;
    },
});
const reg = new ApiRegistry({ core: { bus: new DefaultEngineEventBus() }, apiSpec: CORE_API_SPEC });
reg.register("/math/add", addUC);
