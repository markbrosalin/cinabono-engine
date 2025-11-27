import { makeDefaultMeta } from "../../helpers/index.js";
import { simEvents } from "../SimulationEventBus/index.js";
export class DefaultRunnerStats {
    constructor(bus) {
        this._stats = makeDefaultMeta();
        bus.on(simEvents.PinUpdate, () => this._stats.eventsProcessed++);
        bus.on(simEvents.TickExecuted, () => this._stats.ticksExecuted++);
    }
    getValueOf(stat) {
        return this._stats[stat];
    }
    setValueOf(stat, value) {
        this._stats[stat] = value;
    }
    reset() {
        Object.assign(this._stats, {
            ...makeDefaultMeta(),
            state: this._stats.state,
        });
    }
    snapshot() {
        return { ...this._stats };
    }
}
