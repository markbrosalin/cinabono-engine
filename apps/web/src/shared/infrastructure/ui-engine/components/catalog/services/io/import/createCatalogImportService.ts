import { cloneCatalogValue, createCatalogIOResult, prefixCatalogIOIssues } from "../helpers";
import {
    CATALOG_FORMAT_VERSION,
    type CatalogValidationIssue,
} from "@gately/shared/infrastructure/ui-engine/model/catalog";
import { catalogImportIssues } from "./issues";
import type { CatalogImportService, CatalogImportServiceDeps } from "./types";
import { isSameItemRef } from "../../../helpers/isSameItemRef";

/** Prepares external catalog payloads for safe use inside the catalog domain. */
export const createCatalogImportService = ({
    validation,
}: CatalogImportServiceDeps): CatalogImportService => {
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

            if (bundle.formatVersion !== CATALOG_FORMAT_VERSION) {
                issues.push(catalogImportIssues.bundleFormatVersionInvalid(bundle.formatVersion));
            }

            if (bundle.rootRefs.length === 0) {
                issues.push(catalogImportIssues.bundleRootRefsRequired());
            }

            bundle.rootRefs.forEach((ref, index) => {
                const refResult = validation.validateRef(ref);
                if (!refResult.ok) {
                    issues.push(...prefixCatalogIOIssues(refResult.issues, ["rootRefs", index]));
                }

                const existsInBundle = bundle.libraries.some((library) =>
                    library.items.some((item) => isSameItemRef(item.ref, ref)),
                );
                if (!existsInBundle) {
                    issues.push(catalogImportIssues.bundleRootMissing(index));
                }
            });

            bundle.libraries.forEach((library, index) => {
                const libraryResult = validation.validateLibrary({
                    formatVersion: CATALOG_FORMAT_VERSION,
                    manifest: library.manifest,
                    items: library.items,
                    extensions: library.extensions,
                });

                if (!libraryResult.ok) {
                    issues.push(
                        ...prefixCatalogIOIssues(libraryResult.issues, ["libraries", index]),
                    );
                }
            });

            if (issues.length > 0) {
                return createCatalogIOResult("bundle", undefined, issues);
            }

            return createCatalogIOResult("bundle", cloneCatalogValue(bundle));
        },
    };
};
