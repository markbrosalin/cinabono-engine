import {
    CATALOG_FORMAT_VERSION,
    type CatalogItem,
    type CatalogItemRef,
    type CatalogBundleLibrary,
} from "@gately/shared/infrastructure/ui-engine/model/catalog";
import { cloneCatalogValue, createCatalogIOResult } from "../helpers";
import { isSameItemRef } from "../../../helpers/isSameItemRef";
import { catalogExportIssues } from "./issues";
import type { CatalogExportService, CatalogExportServiceDeps } from "./types";
import { createCatalogItemRefKey } from "../../../helpers/createItemRefKey";

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

    const _enqueueCompositionDependencies = (
        item: CatalogItem,
        queue: CatalogItemRef[],
        seen: Set<string>,
    ): void => {
        item.modules.forEach((module) => {
            if (module.type !== "composition") return;

            module.config.items.forEach((innerItem) => {
                const dependencyKey = createCatalogItemRefKey(innerItem.ref);
                if (seen.has(dependencyKey)) return;

                seen.add(dependencyKey);
                queue.push(innerItem.ref);
            });
        });
    };

    const _collectBundleLibraries = (
        rootRefs: CatalogItemRef[],
    ): {
        libraries: CatalogBundleLibrary[];
        issues: ReturnType<typeof catalogExportIssues.bundleDependencyNotFound>[];
    } => {
        const libraries = new Map<string, CatalogBundleLibrary>();
        const issues: ReturnType<typeof catalogExportIssues.bundleDependencyNotFound>[] = [];
        const seen = new Set<string>();
        const queue: CatalogItemRef[] = [];

        rootRefs.forEach((ref) => {
            const key = createCatalogItemRefKey(ref);
            if (seen.has(key)) return;

            seen.add(key);
            queue.push(ref);
        });

        while (queue.length > 0) {
            const ref = queue.shift();
            if (!ref) continue;

            const item = query.getItem(ref);
            if (!item) {
                issues.push(
                    catalogExportIssues.bundleDependencyNotFound([
                        "dependencyRefs",
                        ref.libraryId,
                        ...ref.path,
                        ref.itemName,
                    ]),
                );
                continue;
            }

            _upsertBundleItem(libraries, item);
            _enqueueCompositionDependencies(item, queue, seen);
        }

        return {
            libraries: [...libraries.values()],
            issues,
        };
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

            const { libraries, issues } = _collectBundleLibraries(rootRefs);
            if (issues.length > 0) {
                return createCatalogIOResult("bundle", undefined, issues);
            }

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
