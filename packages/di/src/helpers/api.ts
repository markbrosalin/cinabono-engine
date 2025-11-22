import { DiConfig, DiToken } from "@di/types";

export const diConfig = <T extends DiToken>(cfg: DiConfig<T>): DiConfig<T> => cfg;

export const diToken = <T>(name: string): DiToken<T> => ({
    id: Symbol(name),
    name,
    __type__: undefined as unknown as T,
});
