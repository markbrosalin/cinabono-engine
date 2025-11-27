import { Insertable } from "../contracts/index.js";
export declare const saveInStoreById: <K, V extends {
    id: K;
}>(store: Insertable<K, V>, data: V | V[]) => void;
//# sourceMappingURL=byId.d.ts.map