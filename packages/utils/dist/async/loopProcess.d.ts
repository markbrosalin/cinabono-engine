interface ILoopProcess {
    shouldContinue: () => boolean;
    processStep: () => void | Promise<void>;
    maxMs?: number;
    delayMs?: number | (() => number);
    abortSignal?: AbortSignal;
}
export declare const loopProcess: ({ shouldContinue, processStep, maxMs, delayMs, abortSignal, }: ILoopProcess) => Promise<void>;
export {};
//# sourceMappingURL=loopProcess.d.ts.map