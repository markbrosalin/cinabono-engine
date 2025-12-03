/* eslint-disable @typescript-eslint/no-explicit-any */
export class PatternBuilder {
    constructor(prefix = "*") {
        this.prefix = prefix;
    }
    single(type) {
        return `${this.prefix}.${type}`;
    }
    phase(type) {
        return {
            start: `${this.prefix}.${type}.start`,
            finish: `${this.prefix}.${type}.finish`,
            error: `${this.prefix}.${type}.error`,
            anyPhase: `${this.prefix}.${type}.*`,
        };
    }
    wildcard() {
        return this.phase("*");
    }
    cd(nextPrefix = "*") {
        return new PatternBuilder(`${this.prefix}.${nextPrefix}`);
    }
    group(usePhase, ...types) {
        const result = { anyType: this.wildcard() };
        for (const type of types) {
            result[type] = usePhase ? this.phase(type) : this.single(type);
        }
        return result;
    }
}
