import { DepsConfigFactory, DepsToken } from "@engine/deps/types/di";
import { diToken } from "okee-di-container";

export const DepsFactories = {
    config: <T extends DepsToken>(fn: DepsConfigFactory<T>) => fn,

    token: <Type>(name: string): DepsToken<Type> => diToken(name),
};
