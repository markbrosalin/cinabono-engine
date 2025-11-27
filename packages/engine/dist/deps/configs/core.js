import { DepsFactories } from "../../deps/api-factories.js";
import { EngineEventBus } from "../../eventBus/index.js";
export const CoreDepsConfigs = [
    DepsFactories.config((tokens) => ({
        token: tokens.core.bus,
        useFactory: () => new EngineEventBus(),
        lifetime: "singleton",
    })),
];
