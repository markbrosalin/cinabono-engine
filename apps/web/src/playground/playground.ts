import { EngineWorkerEvents, WorkerClient } from "@cnbn/engine-worker";
console.log("Goooood evening!");

const engine_worker = new Worker(new URL("./worker.ts", import.meta.url), {
    type: "module",
});

const client = new WorkerClient(engine_worker);

client.on(EngineWorkerEvents.engine.api.step.anyPhase, ({ event, payload }) => {
    console.log(`EVENT: ${event} PAYLOAD: `, payload);
});

await client.isReady();

const tabRes = await client.call("/tab/create", { id: "HAHAH" });

// const itemsRes = await client.call("/item/create", {
//     hash: "RS-TRIGGER",
//     kind: "circuit:logic",
//     name: "RS-TRIGGER_0",
//     path: [tabRes.tabId],
// });

console.log(tabRes);
