import { makeDefaultMeta } from "../../helpers";
import { simEvents } from "../SimulationEventBus";
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
