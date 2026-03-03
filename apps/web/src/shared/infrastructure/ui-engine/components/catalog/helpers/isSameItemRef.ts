import type { CatalogItemRef } from "@gately/shared/infrastructure/ui-engine/model/catalog";

/** Compares catalog item references as stable library-scoped identifiers. */
export const isSameItemRef = (left: CatalogItemRef, right: CatalogItemRef): boolean => {
    return (
        left.libraryId === right.libraryId &&
        left.itemName === right.itemName &&
        left.path.length === right.path.length &&
        left.path.every((segment, index) => segment === right.path[index])
    );
};
