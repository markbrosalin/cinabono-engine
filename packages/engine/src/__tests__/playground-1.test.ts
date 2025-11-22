import { CinabonoBuilder } from "@engine/engine/builder";
import { describe, it } from "vitest";

/**
 * Create tab, create two buffer items and link them together.
 */
describe.skip("Playground_1", () => {
    it("test anything you want", async () => {
        // building the engine
        const Cinabono = await new CinabonoBuilder()
            .configure({
                ignoreErrorsSetup: true,
            })
            .build();

        // create a tab
        const tabResult = Cinabono.api.tab.create();

        // create two buffers
        const itemsResult = Cinabono.api.item.create([
            { kind: "base:logic", path: [tabResult.tabId], hash: "BUFFER" },
            { kind: "base:logic", path: [tabResult.tabId], hash: "BUFFER" },
        ]);

        // linking them together
        Cinabono.api.item.link({
            link: {
                fromItemId: itemsResult[0].builtItem.id,
                fromPin: "0",
                toItemId: itemsResult[1].builtItem.id,
                toPin: "0",
            },
            tabId: tabResult.tabId,
        });

        // check the tab context to see created elements

        const tabContext = Cinabono.deps.stores.tab.get(tabResult.tabId)?.ctx;
        const { itemStore, linkStore, scopeStore } = tabContext!;

        console.log("ItemStore: ", itemStore.export()); // you'll see two buffers created
        console.log("LinkStore: ", linkStore.export()); // you'll see one link created
        console.log("ScopeStore: ", scopeStore.export()); // you'll see tab scope created
    });
});
