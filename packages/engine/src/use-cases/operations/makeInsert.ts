import { MaybeArray } from "@cnbn/schema/primitives";
import {
    Insertable,
    Removable,
    removeFromStore,
    saveInStoreByKey,
} from "@cnbn/entities-runtime/store";
import { toArray } from "@cnbn/utils";
import { FlowToolContract } from "@engine/use-cases/tools";

export function makeInsertStep<K, T>(
    name: string,
    flow: FlowToolContract,
    store: Insertable<K, T> & Removable<K, T>,
    keySelector: (entity: T) => K = (e: T) => (e as T & { id: K }).id
) {
    return (entity: MaybeArray<T>, stepName = `save ${name} to store`) => {
        const arr = toArray(entity);
        return flow.addStep(
            stepName,
            () => saveInStoreByKey(store, arr, keySelector),
            () => removeFromStore(store, arr.map(keySelector))
        );
    };
}
