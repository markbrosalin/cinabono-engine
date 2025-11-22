export type Err = unknown;

export interface SafeRunnerReport<T> {
    result: T | null;
    errors: Err[];
}

export type SavedErr = {
    scope: string;
    error: Err;
};

export interface SafeRunnerContract {
    run<T>(scope: string, fn: () => T): SafeRunnerReport<T>;

    hasErrors(): boolean;

    getErrors(): SavedErr[];
}
