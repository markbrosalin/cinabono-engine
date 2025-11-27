import { SafeRunnerContract, SafeRunnerReport, SavedErr } from "../safe-runner/types.js";
export declare class SafeRunner implements SafeRunnerContract {
    protected errors: SavedErr[];
    run<T>(scope: string, fn: () => T): SafeRunnerReport<T>;
    hasErrors(): boolean;
    getErrors(): SavedErr[];
    clear(): void;
}
//# sourceMappingURL=safe-runner.d.ts.map