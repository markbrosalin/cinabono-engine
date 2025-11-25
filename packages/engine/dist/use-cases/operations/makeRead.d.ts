import { FlowToolContract } from "../../use-cases/tools";
import { Readable } from "@cnbn/entities-runtime";
export declare function makeReadStep<K, T>(name: string, flow: FlowToolContract, store: Readable<K, T>, onNotFound: (key: K) => Error): {
    (key: K, safely: false, stepName?: string): T | undefined;
    (key: K, safely?: true, stepName?: string): T;
};
//# sourceMappingURL=makeRead.d.ts.map