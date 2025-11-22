import { ResultMeta, RunnerResult } from "@sim/model";

export interface RunnerResultCollectorContract {
    getResult(metaOverride?: ResultMeta): RunnerResult;
    reset(): void;
}
