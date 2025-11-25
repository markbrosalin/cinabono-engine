import { CORE_TOKENS } from "../../di/tokens/base";
import { EngineEventBusSetup } from "../../eventBus/eventBus";
import { createDIConfig } from "@repo/di";
export const CORE_CONFIGS = [
    createDIConfig({
        token: CORE_TOKENS.bus,
        useFactory: () => EngineEventBusSetup.init(),
        lifetime: "singleton",
    }),
];
