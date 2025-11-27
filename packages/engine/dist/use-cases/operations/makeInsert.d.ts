import { MaybeArray } from "@cnbn/schema/primitives";
import { Insertable, Removable } from "@cnbn/entities-runtime/store";
import { FlowToolContract } from "../../use-cases/tools/index.js";
export declare function makeInsertStep<K, T>(name: string, flow: FlowToolContract, store: Insertable<K, T> & Removable<K, T>, keySelector?: (entity: T) => K): (entity: MaybeArray<T>, stepName?: string) => void;
//# sourceMappingURL=makeInsert.d.ts.map