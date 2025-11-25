import { Id, ItemLink, PinIndex, Scope } from "@cnbn/schema";
export type LinkIdsResult = {
    flat: Id[];
    byPin: [PinIndex, Id[]][];
};
export declare const scopeLinks: (scope: Scope) => {
    add(link: ItemLink): void;
    remove(link: ItemLink): void;
    listBy(itemId: Id): Id[];
    listInputsBy(itemId: Id, pin?: PinIndex): LinkIdsResult;
    listOutputsBy(itemId: Id, pin?: PinIndex): LinkIdsResult;
    listAll(): Id[];
};
//# sourceMappingURL=scopeLinks.d.ts.map