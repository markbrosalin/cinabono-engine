import { ResultMeta } from "@sim/model";

export const makeDefaultMeta = (): ResultMeta => {
    return {
        ticksExecuted: 0,
        eventsProcessed: 0,
        state: "interactive:running",
    };
};
