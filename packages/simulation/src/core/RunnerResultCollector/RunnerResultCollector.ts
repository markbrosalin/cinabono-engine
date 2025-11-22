import { uniqueKeyByData } from "@cnbn/utils";
import { RunnerResult, PinUpdate, ResultMeta } from "@sim/model";
import { SimulationEventBusContract, simEvents } from "../SimulationEventBus";
import { makeDefaultResult } from "@sim/helpers";
import { RunnerResultCollectorContract } from "./contract";

export class DefaultRunnerResultCollector implements RunnerResultCollectorContract {
    private readonly _res: RunnerResult;
    private readonly _resMap = new Map<string, PinUpdate>();

    constructor(bus: SimulationEventBusContract) {
        this._res = makeDefaultResult();

        bus.on(simEvents.PinUpdate, ({ payload }) => this._handlePinUpdate(payload));
        bus.on(simEvents.SimulationFinished, () => this._handleFinished());
    }

    private _handlePinUpdate(update: PinUpdate) {
        const key = uniqueKeyByData(update.kind, update.itemId, update.pin);
        this._res.updatesPerTick.push(update);
        this._resMap.set(key, update);
    }

    private _handleFinished(): void {
        this._res.updatesPerBatch = [...this._resMap.values()];
    }

    public getResult(metaOverride?: ResultMeta): RunnerResult {
        return {
            meta: { ...this._res.meta, ...metaOverride },
            updatesPerBatch: [...this._res.updatesPerBatch],
            updatesPerTick: [...this._res.updatesPerTick],
        };
    }

    public reset(): void {
        this._resMap.clear();
        Object.assign(this._res, makeDefaultResult());
    }
}
