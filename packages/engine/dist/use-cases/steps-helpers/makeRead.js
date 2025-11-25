export function makeReadStep(name, flow, store, onNotFound) {
    function inner(key, safely = true, stepName = `get ${name} from store`) {
        return flow.addStep(stepName, () => {
            const value = store.get(key);
            if (safely && value == null)
                throw onNotFound(key);
            return value;
        });
    }
    return inner;
}
