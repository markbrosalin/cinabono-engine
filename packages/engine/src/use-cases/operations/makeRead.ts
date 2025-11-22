import { FlowToolContract } from "@engine/use-cases/tools";
import { Readable } from "@cnbn/entities-runtime";

export function makeReadStep<K, T>(
    name: string,
    flow: FlowToolContract,
    store: Readable<K, T>,
    onNotFound: (key: K) => Error
) {
    function inner(key: K, safely: false, stepName?: string): T | undefined;
    function inner(key: K, safely?: true, stepName?: string): T;
    function inner(key: K, safely: boolean = true, stepName: string = `get ${name} from store`) {
        return flow.addStep(stepName, () => {
            const value = store.get(key);
            if (safely && value == null) throw onNotFound(key);
            return value as T | undefined;
        });
    }
    return inner;
}
