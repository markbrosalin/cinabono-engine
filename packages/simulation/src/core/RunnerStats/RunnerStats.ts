import { makeDefaultMeta } from "@sim/helpers";
import { ResultMeta } from "@sim/model/RunnerStats.types";
import { SimulationEventBusContract, simEvents } from "../SimulationEventBus";
import { RunnerStatsContract } from "./contract";

export class DefaultRunnerStats implements RunnerStatsContract {
    private readonly _stats: ResultMeta = makeDefaultMeta();

    constructor(bus: SimulationEventBusContract) {
        bus.on(simEvents.PinUpdate, () => this._stats.eventsProcessed++);
        bus.on(simEvents.TickExecuted, () => this._stats.ticksExecuted++);
    }

    public getValueOf<K extends keyof ResultMeta>(stat: K): ResultMeta[K] {
        return this._stats[stat];
    }

    public setValueOf<K extends keyof ResultMeta, V extends ResultMeta[K]>(
        stat: K,
        value: V
    ): void {
        this._stats[stat] = value;
    }

    public reset(): void {
        Object.assign(this._stats, {
            ...makeDefaultMeta(),
            state: this._stats.state,
        });
    }

    public snapshot(): Readonly<ResultMeta> {
        return { ...this._stats };
    }
}
