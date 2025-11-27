import { mkRunConfig } from "../../helpers/builders/makeRunConfig.js";
import { simEvents } from "../../core/index.js";
export class DefaultSimulationRunner {
    constructor(_cfg) {
        this._cfg = _cfg;
    }
    // state
    setInteractiveRunning() {
        this._cfg.stater.setValueOf("state", "interactive:running");
    }
    setInteractivePaused() {
        this._cfg.stater.setValueOf("state", "interactive:paused");
    }
    setTestbench() {
        this._cfg.stater.setValueOf("state", "testbench");
    }
    // helpers
    kill() {
        this._cfg.stepSimulator.reset();
        this._cfg.stater.reset();
        this._cfg.resulter.reset();
        this._cfg.bus.clear();
    }
    updateInput(params) {
        return this._cfg.stepSimulator.scheduleInput(params);
    }
    updateOutput(params) {
        return this._cfg.stepSimulator.scheduleOutput(params);
    }
    propagateOutput(params) {
        return this._cfg.stepSimulator.propagateOutput(params);
    }
    getNow() {
        return this._cfg.stepSimulator.getNow();
    }
    // run
    simulate(options = {}) {
        const { stater: stats, resulter: resultCollector } = this._cfg;
        const runConfig = mkRunConfig(options);
        this._clearLastSessionData();
        const state = stats.getValueOf("state");
        if (state === "testbench")
            this._runUntilCompletion(runConfig);
        if (state === "interactive:running")
            this._runLimitedTicks(runConfig);
        const meta = stats.snapshot();
        return resultCollector.getResult(meta);
    }
    _runLoop(cfg, shouldContinue) {
        const { stepSimulator, stater: stats, bus } = this._cfg;
        while (shouldContinue(stats.getValueOf("ticksExecuted"))) {
            if (stepSimulator.isFinished())
                break;
            const updatesPerTick = stepSimulator.runOneTick(cfg);
            for (const update of updatesPerTick) {
                bus.emit(simEvents.PinUpdate, update);
            }
            bus.emit(simEvents.TickExecuted, stats.getValueOf("eventsProcessed"));
        }
        bus.emit(simEvents.SimulationFinished, {});
    }
    _runUntilCompletion(runCfg) {
        this._runLoop(runCfg, () => true);
    }
    _runLimitedTicks(runCfg) {
        this._runLoop(runCfg, (tick) => tick < runCfg.maxBatchTicks);
    }
    _clearLastSessionData() {
        this._cfg.resulter.reset();
        this._cfg.stater.reset();
        this._cfg.stepSimulator.resetCurrentSession();
    }
}
