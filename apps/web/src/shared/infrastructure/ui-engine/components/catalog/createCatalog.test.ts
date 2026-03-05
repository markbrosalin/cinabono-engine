import { createRoot } from "solid-js";
import { describe, expect, it } from "vitest";
import { buildSharedServices } from "../../shared-services";
import { createCatalog } from "./createCatalog";

describe("createCatalog", () => {
    it("wires factory and state APIs through public component API", () => {
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
            expect(catalog.state.getLibrary("std")?.manifest.name).toBe("Standard");

            dispose();
        });
    });
});
