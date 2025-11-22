import { RunnerResult } from "@sim/model";
import { makeDefaultMeta } from "./makeDefaultMeta";

export const makeDefaultResult = (): RunnerResult => {
    return {
        meta: makeDefaultMeta(),
        updatesPerTick: [],
        updatesPerBatch: [],
    };
};
