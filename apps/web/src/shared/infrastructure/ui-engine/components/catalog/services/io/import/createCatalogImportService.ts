import { cloneCatalogValue, createCatalogIOResult, prefixCatalogIOIssues } from "../helpers";
import {
    CATALOG_FORMAT_VERSION,
    CatalogBundleLibrary,
    type CatalogBundleDocument,
    type CatalogItem,
    type CatalogItemRef,
    type CatalogValidationIssue,
} from "@gately/shared/infrastructure/ui-engine/model/catalog";
import { catalogImportIssues } from "./issues";
import type { CatalogImportService, CatalogImportServiceDeps } from "./types";
import { createCatalogItemRefKey } from "../../../helpers/createItemRefKey";

type ItemsByRefKeyMap = Map<string, CatalogItem>;

/** Prepares external catalog payloads for safe use inside the catalog domain. */
export const createCatalogImportService = ({
    validation,
}: CatalogImportServiceDeps): CatalogImportService => {
    const _getDirectDependencies = (item: CatalogItem): CatalogItemRef[] => {
        for (const module of item.modules) {
            if (module.type !== "composition") continue;

            return module.config.items.map(({ ref }) => ref);
        }

        return [];
    };

    const _buildItemByRefMapAndPushBundleStructureIssues = (
        bundle: CatalogBundleDocument,
        issues: CatalogValidationIssue[],
    ): ItemsByRefKeyMap => {
        const itemsByRefKey: ItemsByRefKeyMap = new Map();
        const seenLibraryIds = new Set<string>();

        bundle.libraries.forEach((library, libraryIndex) => {
            const libraryId = library.manifest.id;
            if (seenLibraryIds.has(libraryId)) {
                issues.push(catalogImportIssues.bundleLibraryDuplicate(libraryIndex, libraryId));
            } else {
                seenLibraryIds.add(libraryId);
            }

            library.items.forEach((item, itemIndexInLibrary) => {
                const refKey = createCatalogItemRefKey(item.ref);
                if (itemsByRefKey.has(refKey)) {
                    issues.push(
                        catalogImportIssues.bundleItemDuplicateRef(
                            ["libraries", libraryIndex, "items", itemIndexInLibrary, "ref"],
                            refKey,
                        ),
                    );
                    return;
                }

                itemsByRefKey.set(refKey, item);
            });
        });

        return itemsByRefKey;
    };

    const _pushMissingDependencyIssues = (
        rootRefs: CatalogItemRef[],
        itemsByRefKey: ItemsByRefKeyMap,
        issues: CatalogValidationIssue[],
    ): void => {
        const queue: CatalogItemRef[] = [];
        const seen = new Set<string>();
        const missingRefsByKey = new Map<string, CatalogItemRef>();

        rootRefs.forEach((ref) => {
            const key = createCatalogItemRefKey(ref);
            if (seen.has(key)) return;

            seen.add(key);
            if (!itemsByRefKey.has(key)) {
                return;
            }

            queue.push(ref);
        });

        while (queue.length > 0) {
            const currentRef = queue.shift();
            if (!currentRef) continue;

            const currentKey = createCatalogItemRefKey(currentRef);
            const item = itemsByRefKey.get(currentKey);
            if (!item) {
                missingRefsByKey.set(currentKey, currentRef);
                continue;
            }

            _getDirectDependencies(item).forEach((dependencyRef) => {
                const dependencyKey = createCatalogItemRefKey(dependencyRef);
                if (seen.has(dependencyKey)) return;

                seen.add(dependencyKey);
                if (!itemsByRefKey.has(dependencyKey)) {
                    missingRefsByKey.set(dependencyKey, dependencyRef);
                    return;
                }

                queue.push(dependencyRef);
            });
        }

        missingRefsByKey.forEach((ref) => {
            issues.push(
                catalogImportIssues.bundleDependencyMissing([
                    "dependencyRefs",
                    ref.libraryId,
                    ...ref.path,
                    ref.itemName,
                ]),
            );
        });
    };

    const _pushRootRefIssues = (
        rootRefs: CatalogItemRef[],
        itemsByRefKey: Map<string, CatalogItem>,
        issues: CatalogValidationIssue[],
    ) => {
        for (let i = 0; i < rootRefs.length; i++) {
            const ref = rootRefs[i];
            const refResult = validation.validateRef(ref);

            if (!refResult.ok) {
                issues.push(...prefixCatalogIOIssues(refResult.issues, ["rootRefs", i]));
            }

            const refKey = createCatalogItemRefKey(ref);
            if (!itemsByRefKey.has(refKey)) {
                issues.push(catalogImportIssues.bundleRootMissing(i));
            }
        }
    };

    const _pushLibraryIssues = (
        libraries: CatalogBundleLibrary[],
        issues: CatalogValidationIssue[],
    ) => {
        for (let i = 0; i < libraries.length; i++) {
            const lib = libraries[i];
            const libraryResult = validation.validateLibrary({
                formatVersion: CATALOG_FORMAT_VERSION,
                manifest: lib.manifest,
                items: lib.items,
                extensions: lib.extensions,
            });

            if (!libraryResult.ok) {
                issues.push(...prefixCatalogIOIssues(libraryResult.issues, ["libraries", i]));
            }
        }
    };

    const _pushBundleHeaderIssues = (
        bundle: CatalogBundleDocument,
        issues: CatalogValidationIssue[],
    ) => {
        if (bundle.formatVersion !== CATALOG_FORMAT_VERSION) {
            issues.push(catalogImportIssues.bundleFormatVersionInvalid(bundle.formatVersion));
        }

        if (bundle.rootRefs.length === 0) {
            issues.push(catalogImportIssues.bundleRootRefsRequired());
        }
    };

    return {
        importLibrary: (library) => {
            const result = validation.validateLibrary(library);
            if (!result.ok) {
                return createCatalogIOResult("library", undefined, result.issues);
            }

            return createCatalogIOResult("library", cloneCatalogValue(library));
        },
        importDocument: (document) => {
            const result = validation.validateDocument(document);
            if (!result.ok) {
                return createCatalogIOResult("document", undefined, result.issues);
            }

            return createCatalogIOResult("document", cloneCatalogValue(document));
        },
        importBundle: (bundle) => {
            const issues: CatalogValidationIssue[] = [];
            const itemsByRefKey = _buildItemByRefMapAndPushBundleStructureIssues(bundle, issues);

            _pushBundleHeaderIssues(bundle, issues);

            _pushRootRefIssues(bundle.rootRefs, itemsByRefKey, issues);

            _pushLibraryIssues(bundle.libraries, issues);

            _pushMissingDependencyIssues(bundle.rootRefs, itemsByRefKey, issues);

            if (issues.length > 0) {
                return createCatalogIOResult("bundle", undefined, issues);
            }

            return createCatalogIOResult("bundle", cloneCatalogValue(bundle));
        },
    };
};
