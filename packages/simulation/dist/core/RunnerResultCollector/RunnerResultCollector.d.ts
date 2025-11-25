import { RunnerResult, ResultMeta } from "../../model";
import { SimulationEventBusContract } from "../SimulationEventBus";
import { RunnerResultCollectorContract } from "./contract";
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