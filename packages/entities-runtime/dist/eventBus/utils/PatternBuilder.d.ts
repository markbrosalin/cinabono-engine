import { EventPatternFor } from "../types/index.js";
type SingleEvent<Prefix extends string, Type extends string> = `${Prefix}.${Type}`;
export declare class PatternBuilder<Prefix extends string = "*"> {
    protected prefix: Prefix;
    constructor(prefix?: Prefix);
    single<T extends string>(type: T): SingleEvent<Prefix, T>;
    phase<T extends string>(type: T): EventPatternFor<Prefix, T>;
    wildcard(): EventPatternFor<Prefix, "*">;
    cd<T extends string = "*">(nextPrefix?: T): PatternBuilder<`${Prefix}.${T}`>;
    group<UsePhase extends boolean, T extends readonly string[]>(usePhase: UsePhase, ...types: T): {
        [K in T[number]]: UsePhase extends true ? EventPatternFor<Prefix, K> : SingleEvent<Prefix, K>;
    } & {
        anyType: EventPatternFor<Prefix, "*">;
    };
}
export {};
//# sourceMappingURL=PatternBuilder.d.ts.map