import { RunnerResult } from "@cnbn/simulation";
import { CinabonoBuilder } from "@engine/engine/builder";
import { describe, it } from "vitest";

describe.skip("Playground_2", () => {
    it("test anything you want", async () => {
        // building the engine
        const Cinabono = await new CinabonoBuilder().build();

        // create tab
        const tabResult = Cinabono.api.tab.create();

        // create RS-TRIGGER circuit with two NOR inside
        const itemsResult = Cinabono.api.item.create({
            kind: "circuit:logic",
            path: [tabResult.tabId],
            hash: "RS-TRIGGER",
        });

        // items is [circuit, nor_1, nor_2]
        const nor_1 = itemsResult.items[1];
        const nor_2 = itemsResult.items[2];

        // look at two NORs
        console.log("NOR_1 ID:", nor_1.id);
        console.log("NOR_2 ID:", nor_2.id);

        // check the tab context
        const tabContext = Cinabono.deps.stores.tab.get(tabResult.tabId)?.ctx;

        // simulate at start
        printEvents(tabContext!.simulation.simulate());

        // set R=0
        tabContext?.simulation.updateInput({
            itemId: itemsResult.builtItem.id,
            pin: "1",
            value: "0",
        });

        // set S=1
        tabContext?.simulation.updateInput({
            itemId: itemsResult.builtItem.id,
            pin: "0",
            value: "1",
        });

        // simulation should set Q=1
        printEvents(tabContext!.simulation.simulate());

        // set S=0, it should store Q=1
        tabContext?.simulation.updateInput({
            itemId: itemsResult.builtItem.id,
            pin: "0",
            value: "0",
        });

        // no output changes expected
        printEvents(tabContext!.simulation.simulate());

        // set S=1, should not change anything (Q=1)
        tabContext?.simulation.updateInput({
            itemId: itemsResult.builtItem.id,
            pin: "0",
            value: "1",
        });

        // no output changes expected
        printEvents(tabContext!.simulation.simulate());
    });
});

function printEvents(events: RunnerResult) {
    console.log("\n=== Simulation step ===");
    for (const e of events.updatesPerTick) {
        console.log(
            `[${e.t}] ${e.kind.toUpperCase()}` +
                `\titem: ${e.itemId}\tpin: ${e.pin}\tchanged value to: ${e.value}`
        );
    }
}
