import { Condition, ConditionalMergerContract, MergedRecord } from "../merger/types";
import { BaseObj } from "@cnbn/schema";
export declare class ConditionalMerger<T extends BaseObj> implements ConditionalMergerContract<T> {
    protected base: T;
    protected condition: Condition;
    protected result: Record<string, unknown>;
    constructor(base: T, condition: Condition);
    setCondition(condition: Condition): this;
    add<K extends string, V>(key: K, value: V): this;
    build(): MergedRecord<T>;
}
//# sourceMappingURL=merger.d.ts.map