import { EngineEvents } from "@cnbn/engine";
import { PatternBuilder } from "@cnbn/entities-runtime/eventBus";
const worker = new PatternBuilder("workerEngine");
export const EngineWorkerEvents = {
    ...EngineEvents,
    workerEngine: {
        rpc: worker.phase("rpc"),
        ready: worker.single("ready"),
        anyType: worker.wildcard(),
    },
};
