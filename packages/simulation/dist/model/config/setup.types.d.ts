import { EventTimeWheelContract, GenerationTrackerContract, InputHandlerContract, InOutHandlerDeps, OutputHandlerContract, PinUpdateStoreContract, RunnerResultCollectorContract, SimulationEventBusContract, StepSimulatorContract } from "../../core";
import { DefaultRunnerStats } from "../../core/RunnerStats/RunnerStats";
import { SimulationCtx } from "../SimulatorRunner.types";
import { SimulationRunnerContract } from "../../core/SimulationRunner";
export interface SimulationFactoriesOverrides {
    stepDeps?: StepFactoriesOverrides;
    bus?: () => SimulationEventBusContract;
    stepSimulator?: (deps: StepSimulatorDeps) => StepSimulatorContract;
    stater?: (bus: SimulationEventBusContract) => DefaultRunnerStats;
    resulter?: (bus: SimulationEventBusContract) => RunnerResultCollectorContract;
    runner?: (deps: RunnerDeps) => SimulationRunnerContract;
}
export interface StepFactoriesOverrides {
    timeSlots?: number;
    pinUpdateStore?: () => PinUpdateStoreContract;
    genTracker?: () => GenerationTrackerContract;
    timeWheel?: (slots: number) => EventTimeWheelContract;
    inputHandler?: (deps: InOutHandlerDeps) => InputHandlerContract;
    outputHandler?: (deps: InOutHandlerDeps) => OutputHandlerContract;
}
export interface RunnerDeps {
    ctx: SimulationCtx;
    stepSimulator: StepSimulatorContract;
    bus: SimulationEventBusContract;
    stater: DefaultRunnerStats;
    resulter: RunnerResultCollectorContract;
}
export interface StepSimulatorDeps {
    ctx: SimulationCtx;
    pinUpdateStore: PinUpdateStoreContract;
    genTracker: GenerationTrackerContract;
    timeWheel: EventTimeWheelContract;
    inHandler: InputHandlerContract;
    outHandler: OutputHandlerContract;
}
//# sourceMappingURL=setup.types.d.ts.map