import { removeFromStore, saveInStoreByKey, } from "@cnbn/entities-runtime/store";
import { toArray } from "@cnbn/utils";
export function makeInsertStep(name, flow, store, keySelector = (e) => e.id) {
    return (entity, stepName = `save ${name} to store`) => {
        const arr = toArray(entity);
        return flow.addStep(stepName, () => saveInStoreByKey(store, arr, keySelector), () => removeFromStore(store, arr.map(keySelector)));
    };
}
