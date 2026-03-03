import { createRoot } from "solid-js";
import { describe, expect, it } from "vitest";
import type { CatalogLibraryDocument } from "@gately/shared/infrastructure/ui-engine/model/catalog";
import { buildSharedServices } from "../../shared-services";
import { createCatalog } from "./createCatalog";

const createLibrary = (): CatalogLibraryDocument => ({
    manifest: {
        id: "std",
        name: "Standard",
        version: "1.0.0",
        createdAt: 1,
    },
    items: [],
});

describe("createCatalog", () => {
    it("delegates state mutations through public API", () => {
        createRoot((dispose) => {
            const { getService } = buildSharedServices();
            const catalog = createCatalog({
                external: {},
                getSharedService: getService,
            });

            catalog.upsertLibrary(createLibrary());

            expect(catalog.state.libraries()).toEqual([
                {
                    manifest: {
                        id: "std",
                        name: "Standard",
                        version: "1.0.0",
                        createdAt: 1,
                    },
                    items: [],
                },
            ]);
            expect(catalog.state.librarySummaries()).toEqual([
                {
                    id: "std",
                    name: "Standard",
                    version: "1.0.0",
                },
            ]);

            dispose();
        });
    });
});
