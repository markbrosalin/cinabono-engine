import { diToken } from "okee-di-container";
export const DepsFactories = {
    config: (fn) => fn,
    token: (name) => diToken(name),
};
