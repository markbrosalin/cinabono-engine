import {
    CATALOG_FORMAT_VERSION,
    type CatalogItem,
    type CatalogBundleLibrary,
} from "@gately/shared/infrastructure/ui-engine/model/catalog";
import { cloneCatalogValue, createCatalogIOResult } from "../helpers";
import { isSameItemRef } from "../../../helpers/isSameItemRef";
import { catalogExportIssues } from "./issues";
import type { CatalogExportService, CatalogExportServiceDeps } from "./types";

/** Reads and clones current catalog data for document-level export. */
export const createCatalogExportService = ({
    query,
}: CatalogExportServiceDeps): CatalogExportService => {
    const _upsertBundleItem = (
        libraries: Map<string, CatalogBundleLibrary>,
        item: CatalogItem,
    ): void => {
        const library = query.getLibrary(item.ref.libraryId);
        if (!library) return;

        const current = libraries.get(item.ref.libraryId);
        if (!current) {
            libraries.set(item.ref.libraryId, {
                manifest: library.manifest,
                items: [item],
            });
            return;
        }

        if (!current.items.some((existing) => isSameItemRef(existing.ref, item.ref))) {
            current.items = [...current.items, item];
        }
    };

    const _collectBundleLibraries = (items: CatalogItem[]): CatalogBundleLibrary[] => {
        const libraries = new Map<string, CatalogBundleLibrary>();

        items.forEach((item) => {
            _upsertBundleItem(libraries, item);
        });

        return [...libraries.values()];
    };

    return {
        exportLibrary: ({ libraryId }) => {
            if (!libraryId) {
                return createCatalogIOResult("library", undefined, [
                    catalogExportIssues.libraryIdRequired(),
                ]);
            }

            const library = query.getLibrary(libraryId);
            if (!library) {
                return createCatalogIOResult("library", undefined, [
                    catalogExportIssues.libraryNotFound(libraryId),
                ]);
            }

            return createCatalogIOResult("library", cloneCatalogValue(library));
        },
        exportBundle: ({ rootRefs }) => {
            if (rootRefs.length === 0) {
                return createCatalogIOResult("bundle", undefined, [
                    catalogExportIssues.bundleRootRefsRequired(),
                ]);
            }

            const missingRootIndex = rootRefs.findIndex((ref) => !query.getItem(ref));
            if (missingRootIndex !== -1) {
                return createCatalogIOResult("bundle", undefined, [
                    catalogExportIssues.bundleRootNotFound(missingRootIndex),
                ]);
            }

            const closure = query.collectDependencyClosure(rootRefs);
            const issues = closure.missingRefs.map((ref) =>
                catalogExportIssues.bundleDependencyNotFound([
                    "dependencyRefs",
                    ref.libraryId,
                    ...ref.path,
                    ref.itemName,
                ]),
            );
            if (issues.length > 0) {
                return createCatalogIOResult("bundle", undefined, issues);
            }

            const libraries = _collectBundleLibraries(closure.items);

            return createCatalogIOResult(
                "bundle",
                cloneCatalogValue({
                    formatVersion: CATALOG_FORMAT_VERSION,
                    rootRefs,
                    libraries,
                }),
            );
        },
        exportDocument: () =>
            createCatalogIOResult("document", cloneCatalogValue(query.document())),
    };
};
