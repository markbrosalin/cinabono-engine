import { SafeRunnerContract, SafeRunnerReport, SavedErr } from "@entities/safe-runner/types";

export class SafeRunner implements SafeRunnerContract {
    protected errors: SavedErr[] = [];

    public run<T>(scope: string, fn: () => T): SafeRunnerReport<T> {
        let result: T | null = null;

        try {
            result = fn();
        } catch (error) {
            this.errors.push({ scope, error });
        }

        return { errors: this.errors, result };
    }

    public hasErrors(): boolean {
        return this.errors.length > 0;
    }

    public getErrors(): SavedErr[] {
        return this.errors;
    }

    public clear(): void {
        this.errors = [] as SavedErr[];
    }
}
