import { waitForNextTick } from "./defer.js";
export const loopProcess = async ({ shouldContinue, processStep, maxMs = 16, delayMs = 0, abortSignal, }) => {
    while (shouldContinue()) {
        const start = performance.now();
        while (shouldContinue() && performance.now() - start < maxMs) {
            if (abortSignal?.aborted)
                throw new Error("Aborted");
            const delayValue = typeof delayMs === "function" ? delayMs() : delayMs;
            if (delayValue !== 0) {
                await waitForNextTick(delayValue);
            }
            await processStep();
        }
        if (shouldContinue() && !abortSignal?.aborted) {
            await waitForNextTick(16);
        }
    }
};
