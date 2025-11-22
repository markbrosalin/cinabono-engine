import { EngineOptionsType } from "@engine/engine/options";
import { SafeRunner, SafeRunnerContract } from "@cnbn/entities-runtime";

export interface EngineSafeRunnerContract extends SafeRunnerContract {
    throwIfErrors(opts: EngineOptionsType): void;
}

export class EngineSafeRunner extends SafeRunner implements EngineSafeRunnerContract {
    public throwIfErrors(opts: EngineOptionsType): void {
        if (opts.ignoreErrorsSetup) return;
        if (!this.hasErrors()) return;

        const message = this._formatErrorMessage();
        throw new Error(message);
    }

    private _formatErrorMessage(): string {
        const lines = this.errors.map((e) => {
            const msg = e.error instanceof Error ? e.error.message : String(e.error);
            return `- ${e.scope}: ${msg}`;
        });

        return `Engine started with errors:\n${lines.join("\n")}`;
    }
}
