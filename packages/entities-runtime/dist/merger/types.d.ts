import { BaseObj } from "@cnbn/schema";
export type Condition = <V>(value: V) => boolean;
export type MergedRecord<T> = T & Record<string, unknown>;
export interface ConditionalMergerContract<T extends BaseObj> {
    setCondition(condition: Condition): this;
    add<K extends string, V>(key: K, value: V): this;
    build(): MergedRecord<T>;
}
//# sourceMappingURL=types.d.ts.map