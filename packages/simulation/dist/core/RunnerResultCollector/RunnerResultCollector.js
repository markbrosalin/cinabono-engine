import { uniqueKeyByData } from "@cnbn/utils";
import { simEvents } from "../SimulationEventBus";
import { makeDefaultResult } from "../../helpers";
export class DefaultRunnerResultCollector {
    constructor(bus) {
        this._resMap = new Map();
        this._res = makeDefaultResult();
        bus.on(simEvents.PinUpdate, ({ payload }) => this._handlePinUpdate(payload));
        bus.on(simEvents.SimulationFinished, () => this._handleFinished());
    }
    _handlePinUpdate(update) {
        const key = uniqueKeyByData(update.kind, update.itemId, update.pin);
        this._res.updatesPerTick.push(update);
        this._resMap.set(key, update);
    }
    _handleFinished() {
        this._res.updatesPerBatch = [...this._resMap.values()];
    }
    getResult(metaOverride) {
        return {
            meta: { ...this._res.meta, ...metaOverride },
            updatesPerBatch: [...this._res.updatesPerBatch],
            updatesPerTick: [...this._res.updatesPerTick],
        };
    }
    reset() {
        this._resMap.clear();
        Object.assign(this._res, makeDefaultResult());
    }
}
