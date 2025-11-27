import { DepsFactories } from "@engine/deps/api-factories";
import { EngineEventBus } from "@engine/eventBus";
export const CoreDepsConfigs = [
    DepsFactories.config((tokens) => ({
        token: tokens.core.bus,
        useFactory: () => new EngineEventBus(),
        lifetime: "singleton",
    })),
];
