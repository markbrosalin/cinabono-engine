import { KindKey, HierarchyPath, Id } from "./types.js";
export type WithState<K extends KindKey = KindKey> = WithItemKind<K> & WithItemName;
export type WithItemKind<K extends KindKey = KindKey> = {
    kind: K;
};
export type WithItemName = {
    name: string;
};
export type WithHash = {
    hash: string;
};
export type WithId<K extends Id = Id> = {
    id: K;
};
export type WithPath = {
    path: HierarchyPath;
};
//# sourceMappingURL=aspects.d.ts.map