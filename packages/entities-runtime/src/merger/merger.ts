import { Condition, ConditionalMergerContract, MergedRecord } from "@entities/merger/types";
import { BaseObj } from "@cnbn/schema";

export class ConditionalMerger<T extends BaseObj> implements ConditionalMergerContract<T> {
    protected result: Record<string, unknown> = {};

    constructor(
        protected base: T,
        protected condition: Condition
    ) {}

    public setCondition(condition: Condition) {
        this.condition = condition;
        return this;
    }

    public add<K extends string, V>(key: K, value: V): this {
        if (this.condition(value)) this.result[key] = value;
        return this;
    }

    public build(): MergedRecord<T> {
        return { ...this.base, ...this.result };
    }
}
