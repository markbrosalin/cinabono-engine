import { size } from "../characteristics.js";
import { waitForNextTick } from "./defer.js";
export const batchProcess = async ({ items, frameBudgetMs = 16, delayMs = 0, processItem, abortSignal, onBatchFinished, }) => {
    const results = [];
    if (!items)
        return results;
    const iterator = items[Symbol.iterator]();
    let doneCount = 0;
    let current = iterator.next();
    if (abortSignal?.aborted)
        throw new Error("Aborted");
    while (!current.done) {
        const start = performance.now();
        while (!current.done) {
            if (abortSignal?.aborted)
                throw new Error("Aborted");
            const result = await processItem(current.value);
            if (Array.isArray(result)) {
                results.push(...result);
            }
            else {
                results.push(result);
            }
            doneCount++;
            current = iterator.next();
            if (performance.now() - start >= frameBudgetMs)
                break;
        }
        onBatchFinished?.(doneCount, size(items) - doneCount);
        if (!current.done) {
            const delayValue = typeof delayMs === "function" ? delayMs() : delayMs;
            await waitForNextTick(delayValue);
        }
    }
    return results;
};
