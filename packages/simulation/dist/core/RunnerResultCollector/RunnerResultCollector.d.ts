import { RunnerResult, ResultMeta } from "../../model/index.js";
import { SimulationEventBusContract } from "../SimulationEventBus/index.js";
import { RunnerResultCollectorContract } from "./contract.js";
export declare class DefaultRunnerResultCollector implements RunnerResultCollectorContract {
    private readonly _res;
    private readonly _resMap;
    constructor(bus: SimulationEventBusContract);
    private _handlePinUpdate;
    private _handleFinished;
    getResult(metaOverride?: ResultMeta): RunnerResult;
    reset(): void;
}
//# sourceMappingURL=RunnerResultCollector.d.ts.map