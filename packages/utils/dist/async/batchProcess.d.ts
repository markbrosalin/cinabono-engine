interface IBatchProcess<T, R> {
    items: Iterable<T> | undefined;
    processItem: (item: T) => R | Promise<R>;
    frameBudgetMs?: number;
    delayMs?: number | (() => number);
    abortSignal?: AbortSignal;
    onBatchFinished?: (done: number, remaining: number) => void;
}
export declare const batchProcess: <T, R>({ items, frameBudgetMs, delayMs, processItem, abortSignal, onBatchFinished, }: IBatchProcess<T, R>) => Promise<R[]>;
export {};
//# sourceMappingURL=batchProcess.d.ts.map