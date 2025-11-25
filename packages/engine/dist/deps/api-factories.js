import { diToken } from "@cnbn/di";
export const DepsFactories = {
    config: (fn) => fn,
    token: (name) => diToken(name),
};
