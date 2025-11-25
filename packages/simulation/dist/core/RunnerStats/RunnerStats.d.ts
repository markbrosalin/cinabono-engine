import { ResultMeta } from "../../model/RunnerStats.types";
import { SimulationEventBusContract } from "../SimulationEventBus";
import { RunnerStatsContract } from "./contract";
export declare class DefaultRunnerStats implements RunnerStatsContract {
    private readonly _stats;
    constructor(bus: SimulationEventBusContract);
    getValueOf<K extends keyof ResultMeta>(stat: K): ResultMeta[K];
    setValueOf<K extends keyof ResultMeta, V extends ResultMeta[K]>(stat: K, value: V): void;
    reset(): void;
    snapshot(): Readonly<ResultMeta>;
}
//# sourceMappingURL=RunnerStats.d.ts.map