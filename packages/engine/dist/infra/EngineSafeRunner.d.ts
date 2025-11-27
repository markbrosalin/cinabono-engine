import { EngineOptionsType } from "../engine/options.js";
import { SafeRunner, SafeRunnerContract } from "@cnbn/entities-runtime";
export interface EngineSafeRunnerContract extends SafeRunnerContract {
    throwIfErrors(opts: EngineOptionsType): void;
}
export declare class EngineSafeRunner extends SafeRunner implements EngineSafeRunnerContract {
    throwIfErrors(opts: EngineOptionsType): void;
    private _formatErrorMessage;
}
//# sourceMappingURL=EngineSafeRunner.d.ts.map