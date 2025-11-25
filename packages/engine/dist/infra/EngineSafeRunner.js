import { SafeRunner } from "@cnbn/entities-runtime";
export class EngineSafeRunner extends SafeRunner {
    throwIfErrors(opts) {
        if (opts.ignoreErrorsSetup)
            return;
        if (!this.hasErrors())
            return;
        const message = this._formatErrorMessage();
        throw new Error(message);
    }
    _formatErrorMessage() {
        const lines = this.errors.map((e) => {
            const msg = e.error instanceof Error ? e.error.message : String(e.error);
            return `- ${e.scope}: ${msg}`;
        });
        return `Engine started with errors:\n${lines.join("\n")}`;
    }
}
