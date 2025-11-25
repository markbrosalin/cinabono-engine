export class ConditionalMerger {
    constructor(base, condition) {
        this.base = base;
        this.condition = condition;
        this.result = {};
    }
    setCondition(condition) {
        this.condition = condition;
        return this;
    }
    add(key, value) {
        if (this.condition(value))
            this.result[key] = value;
        return this;
    }
    build() {
        return { ...this.base, ...this.result };
    }
}
