import { FlowToolContract } from "../../use-cases/tools/index.js";
import { Insertable, Removable } from "@cnbn/entities-runtime/store";
export declare function makeRemoveStep<K, V>(name: string, flow: FlowToolContract, store: Removable<K, V> & Insertable<K, V>): {
    (keys: K[], stepName?: string): V[];
    (key: K, stepName?: string): V | undefined;
};
//# sourceMappingURL=makeRemove.d.ts.map