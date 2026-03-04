import { createRoot } from "solid-js";
import { describe, expect, it } from "vitest";
import { buildSharedServices } from "../../shared-services";
import { createCatalog } from "./createCatalog";

describe("createCatalog", () => {
    it("delegates state mutations through public API", () => {
        createRoot((dispose) => {
            const { getService } = buildSharedServices();
            const catalog = createCatalog({
                external: {},
                getSharedService: getService,
            });

            catalog.upsertLibrary(
                catalog.createLibrary({
                    id: "std",
                    name: "Standard",
                }),
            );

            expect(catalog.state.libraries()).toEqual([
                {
                    formatVersion: 1,
                    manifest: {
                        id: "std",
                        name: "Standard",
                        version: "1.0.0",
                        createdAt: expect.any(Number),
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
            expect(catalog.validateLibrary(catalog.state.libraries()[0]!).ok).toBe(true);

            dispose();
        });
    });
});
