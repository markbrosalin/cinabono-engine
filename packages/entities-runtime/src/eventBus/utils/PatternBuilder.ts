/* eslint-disable @typescript-eslint/no-explicit-any */

import { EventPatternFor } from "../types";

type SingleEvent<Prefix extends string, Type extends string> = `${Prefix}.${Type}`;

export class PatternBuilder<Prefix extends string = "*"> {
    constructor(protected prefix: Prefix = "*" as Prefix) {}

    public single<T extends string>(type: T): SingleEvent<Prefix, T> {
        return `${this.prefix}.${type}` as const;
    }

    public phase<T extends string>(type: T): EventPatternFor<Prefix, T> {
        return {
            start: `${this.prefix}.${type}.start`,
            finish: `${this.prefix}.${type}.finish`,
            error: `${this.prefix}.${type}.error`,
            anyPhase: `${this.prefix}.${type}.*`,
        } as const;
    }

    public wildcard() {
        return this.phase("*");
    }

    public cd<T extends string = "*">(nextPrefix: T = "*" as T) {
        return new PatternBuilder(`${this.prefix}.${nextPrefix}`);
    }

    public group<UsePhase extends boolean, T extends readonly string[]>(
        usePhase: UsePhase,
        ...types: T
    ): {
        [K in T[number]]: UsePhase extends true
            ? EventPatternFor<Prefix, K>
            : SingleEvent<Prefix, K>;
    } & {
        anyType: EventPatternFor<Prefix, "*">;
    } {
        const result: any = { anyType: this.wildcard() };

        for (const type of types) {
            result[type] = usePhase ? this.phase(type) : this.single(type);
        }

        return result;
    }
}
