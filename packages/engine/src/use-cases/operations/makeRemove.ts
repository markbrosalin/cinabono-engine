import { FlowToolContract } from "@engine/use-cases/tools";
import {
    Insertable,
    Removable,
    removeFromStore,
    saveInStoreByKey,
} from "@cnbn/entities-runtime/store";

export function makeRemoveStep<K, V>(
    name: string,
    flow: FlowToolContract,
    store: Removable<K, V> & Insertable<K, V>
) {
    function inner(keys: K[], stepName?: string): V[];
    function inner(key: K, stepName?: string): V | undefined;
    function inner(keys: K | K[], stepName: string = `remove ${name} from store`) {
        if (Array.isArray(keys)) {
            return flow.addStep(
                stepName,
                () => removeFromStore(store, keys as K[]),
                (res) => saveInStoreByKey(store, res, (_, i) => keys[i] as K)
            );
        }
        return flow.addStep(
            stepName,
            () => removeFromStore(store, keys as K),
            (res) => saveInStoreByKey(store, res, () => keys as K)
        );
    }
    return inner;
}
