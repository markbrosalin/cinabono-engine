import { mkRunConfig } from "@sim/helpers/builders/makeRunConfig";
import {
    SimInputEvent,
    SimOutputEvent,
    Tick,
    RunnerResult,
    RunConfig,
    UpdateIOParams,
    PropagateOutputParams,
    RunnerDeps,
} from "@sim/model";
import { simEvents } from "@sim/core";
import { SimulationRunnerContract } from "./contract";

export class DefaultSimulationRunner implements SimulationRunnerContract {
    constructor(private readonly _cfg: RunnerDeps) {}

    // state

    public setInteractiveRunning(): void {
        this._cfg.stater.setValueOf("state", "interactive:running");
    }

    public setInteractivePaused(): void {
        this._cfg.stater.setValueOf("state", "interactive:paused");
    }

    public setTestbench(): void {
        this._cfg.stater.setValueOf("state", "testbench");
    }

    // helpers

    public kill(): void {
        this._cfg.stepSimulator.reset();
        this._cfg.stater.reset();
        this._cfg.resulter.reset();
        this._cfg.bus.clear();
    }

    public updateInput(params: UpdateIOParams): SimInputEvent[] {
        return this._cfg.stepSimulator.scheduleInput(params);
    }

    public updateOutput(params: UpdateIOParams): SimOutputEvent[] {
        return this._cfg.stepSimulator.scheduleOutput(params);
    }

    public propagateOutput(params: PropagateOutputParams): SimInputEvent[] {
        return this._cfg.stepSimulator.propagateOutput(params);
    }

    public getNow(): Tick {
        return this._cfg.stepSimulator.getNow();
    }

    // run

    public simulate(options: Partial<RunConfig> = {}): RunnerResult {
        const { stater: stats, resulter: resultCollector } = this._cfg;
        const runConfig = mkRunConfig(options);

        this._clearLastSessionData();

        const state = stats.getValueOf("state");
        if (state === "testbench") this._runUntilCompletion(runConfig);
        if (state === "interactive:running") this._runLimitedTicks(runConfig);

        const meta = stats.snapshot();
        return resultCollector.getResult(meta);
    }

    private _runLoop(cfg: RunConfig, shouldContinue: (tick: Tick) => boolean): void {
        const { stepSimulator, stater: stats, bus } = this._cfg;
        while (shouldContinue(stats.getValueOf("ticksExecuted"))) {
            if (stepSimulator.isFinished()) break;

            const updatesPerTick = stepSimulator.runOneTick(cfg);

            for (const update of updatesPerTick) {
                bus.emit(simEvents.PinUpdate, update);
            }
            bus.emit(simEvents.TickExecuted, stats.getValueOf("eventsProcessed"));
        }

        bus.emit(simEvents.SimulationFinished, {});
    }

    private _runUntilCompletion(runCfg: RunConfig): void {
        this._runLoop(runCfg, () => true);
    }

    private _runLimitedTicks(runCfg: RunConfig): void {
        this._runLoop(runCfg, (tick) => tick < runCfg.maxBatchTicks);
    }

    private _clearLastSessionData(): void {
        this._cfg.resulter.reset();
        this._cfg.stater.reset();
        this._cfg.stepSimulator.resetCurrentSession();
    }
}
