import { Insertable } from "../contracts";
export declare const saveInStoreById: <K, V extends {
    id: K;
}>(store: Insertable<K, V>, data: V | V[]) => void;
//# sourceMappingURL=byId.d.ts.map