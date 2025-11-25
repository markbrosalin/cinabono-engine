import { EngineEventMap } from "../eventBus/events";
import { EngineEventBusContract, EngineEventBusFactoryOverrides } from "../eventBus/types";
import { BaseEventBus } from "@repo/entities-runtime";
export declare class DefaultEngineEventBus extends BaseEventBus<EngineEventMap> implements EngineEventBusContract {
}
export declare class EngineEventBusSetup {
    static init(overrides?: EngineEventBusFactoryOverrides): EngineEventBusContract;
}
//# sourceMappingURL=eventBus.d.ts.map