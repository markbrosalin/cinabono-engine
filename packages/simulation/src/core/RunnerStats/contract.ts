import { ResultMeta } from "@sim/model/RunnerStats.types";

export interface RunnerStatsContract {
    setValueOf<K extends keyof ResultMeta, V extends ResultMeta[K]>(stat: K, value: V): void;
    getValueOf<K extends keyof ResultMeta>(stat: K): ResultMeta[K];
    reset(): void;
    snapshot(overrides?: Partial<ResultMeta>): Readonly<ResultMeta>;
}
