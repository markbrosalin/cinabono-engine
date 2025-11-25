import { DiConfig, DiToken } from "../types";
export declare const diConfig: <T extends DiToken>(cfg: DiConfig<T>) => DiConfig<T>;
export declare const diToken: <T, Extra extends Record<string, any> = Record<string, any>>(name: string, extra?: Extra) => DiToken<T, Extra>;
//# sourceMappingURL=builder.d.ts.map