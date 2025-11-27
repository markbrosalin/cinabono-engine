import { Insertable, Removable } from "../contracts/index.js";
export declare const saveInStoreByKey: <K, V>(store: Insertable<K, V>, data: V[] | V, keySelector: (entity: V, i: number) => K) => void;
export declare function removeFromStore<K, V>(store: Removable<K, V>, keys: K[]): V[];
export declare function removeFromStore<K, V>(store: Removable<K, V>, key: K): V | undefined;
//# sourceMappingURL=base.d.ts.map