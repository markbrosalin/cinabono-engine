import { ResultMeta, RunnerResult } from "../../model/index.js";
export interface RunnerResultCollectorContract {
    getResult(metaOverride?: ResultMeta): RunnerResult;
    reset(): void;
}
//# sourceMappingURL=contract.d.ts.map