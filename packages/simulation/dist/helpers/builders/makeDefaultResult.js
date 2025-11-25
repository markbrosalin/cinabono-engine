import { makeDefaultMeta } from "./makeDefaultMeta";
export const makeDefaultResult = () => {
    return {
        meta: makeDefaultMeta(),
        updatesPerTick: [],
        updatesPerBatch: [],
    };
};
