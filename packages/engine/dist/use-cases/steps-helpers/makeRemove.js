import { removeFromStore, saveInStoreByKey, } from "@repo/entities-runtime/store";
export function makeRemoveStep(name, flow, store) {
    function inner(keys, stepName = `remove ${name} from store`) {
        if (Array.isArray(keys)) {
            return flow.addStep(stepName, () => removeFromStore(store, keys), (res) => saveInStoreByKey(store, res, (_, i) => keys[i]));
        }
        return flow.addStep(stepName, () => removeFromStore(store, keys), (res) => saveInStoreByKey(store, res, () => keys));
    }
    return inner;
}
