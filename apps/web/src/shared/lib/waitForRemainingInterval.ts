type WaitFn = (ms: number) => Promise<void>;

const defaultWait: WaitFn = (ms) =>
    new Promise<void>((resolve) => {
        setTimeout(resolve, ms);
    });

const nowInMs = (): number => globalThis.performance?.now?.() ?? Date.now();

export const getRemainingIntervalMs = (
    startedAtMs: number,
    targetIntervalMs: number,
    nowMs: number = nowInMs(),
): number => {
    const elapsedMs = Math.max(0, nowMs - startedAtMs);
    return Math.max(0, targetIntervalMs - elapsedMs);
};

export const waitForRemainingInterval = async (
    startedAtMs: number,
    targetIntervalMs: number,
    wait: WaitFn = defaultWait,
    nowMs: number = nowInMs(),
): Promise<number> => {
    const remainingMs = getRemainingIntervalMs(startedAtMs, targetIntervalMs, nowMs);
    await wait(remainingMs);
    return remainingMs;
};
