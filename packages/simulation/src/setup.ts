import * as core from "./core";
import { SimulationFactoriesOverrides, SimulationCtx, StepFactoriesOverrides } from "./model";

export class SimulationRunnerSetup {
    static init(
        ctx: SimulationCtx,
        overrides: SimulationFactoriesOverrides = {}
    ): core.SimulationRunnerContract {
        const stepDeps = this._initStepSimulatorDeps(ctx, overrides.stepDeps);
        const infra = this._initInfra(overrides);

        const stepCtx = { ctx, ...stepDeps };
        const stepSimulator =
            overrides.stepSimulator?.(stepCtx) ?? new core.DefaultStepSimulator(stepCtx);

        const runnerCtx = { ctx, stepSimulator, ...infra };
        const runner = overrides.runner?.(runnerCtx) ?? new core.DefaultSimulationRunner(runnerCtx);

        return runner;
    }

    private static _initStepSimulatorDeps(ctx: SimulationCtx, ovrds: StepFactoriesOverrides = {}) {
        const { getItem } = ctx;
        const slots = ovrds.timeSlots ?? 256;

        const pinUpdateStore = ovrds.pinUpdateStore?.() ?? new core.DefaultPinUpdateStore();
        const genTracker = ovrds.genTracker?.() ?? new core.DefaultGenerationTracker();
        const timeWheel = ovrds.timeWheel?.(slots) ?? new core.DefaultEventTimeWheel(slots);

        const handlerCtx = { getItem, genTracker };

        const inHandler =
            ovrds.inputHandler?.(handlerCtx) ?? new core.DefaultInputHandler(handlerCtx);
        const outHandler =
            ovrds.outputHandler?.(handlerCtx) ?? new core.DefaultOutputHandler(handlerCtx);

        return { pinUpdateStore, genTracker, timeWheel, inHandler, outHandler } as const;
    }

    private static _initInfra(ovrds: SimulationFactoriesOverrides = {}) {
        const bus = ovrds.bus?.() ?? new core.DefaultSimulationEventBus();
        const stater = ovrds.stater?.(bus) ?? new core.DefaultRunnerStats(bus);
        const resulter = ovrds.resulter?.(bus) ?? new core.DefaultRunnerResultCollector(bus);

        return { bus, stater, resulter } as const;
    }
}
