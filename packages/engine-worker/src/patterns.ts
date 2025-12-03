import { EngineEvents } from "@cnbn/engine";
import { PatternBuilder } from "@cnbn/entities-runtime/eventBus";

const worker = new PatternBuilder("engine.worker");

const currentEngine = EngineEvents.engine;

const engineWithWorker = {
    ...currentEngine,
    worker: {
        rpc: worker.phase("rpc"),
        ready: worker.single("ready"),
        anyType: worker.wildcard(),
    },
} as const;

export const EngineWorkerEvents = {
    ...EngineEvents,
    engine: engineWithWorker,
} as const;
