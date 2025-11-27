import { makeDefaultMeta } from "./makeDefaultMeta.js";
export const makeDefaultResult = () => {
    return {
        meta: makeDefaultMeta(),
        updatesPerTick: [],
        updatesPerBatch: [],
    };
};
