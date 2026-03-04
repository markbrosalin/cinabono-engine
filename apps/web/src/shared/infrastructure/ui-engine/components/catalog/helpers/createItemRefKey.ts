import { CatalogItemRef } from "../../../model/catalog";

export const createCatalogItemRefKey = (ref: CatalogItemRef): string => {
    return [ref.libraryId, ...ref.path, ref.itemName].join("::");
};
