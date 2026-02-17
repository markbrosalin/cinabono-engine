export type DelayMode = "raf" | number;

export type CancelableDelay = {
    wait: (delay: DelayMode) => Promise<void>;
    cancel: () => void;
    getState: () => { hasTimeoutWait: boolean; hasRafWait: boolean };
};

export const createCancelableDelay = (): CancelableDelay => {
    let timeoutId: number | undefined;
    let rafId: number | undefined;
    let resolveWait: (() => void) | undefined;

    const clearHandles = () => {
        if (timeoutId != null) {
            window.clearTimeout(timeoutId);
            timeoutId = undefined;
        }

        if (rafId != null) {
            window.cancelAnimationFrame(rafId);
            rafId = undefined;
        }
    };

    const finish = () => {
        const resolve = resolveWait;
        resolveWait = undefined;
        clearHandles();
        resolve?.();
    };

    const cancel = () => {
        if (!resolveWait && timeoutId == null && rafId == null) return;
        finish();
    };

    const wait = (delay: DelayMode): Promise<void> =>
        new Promise((resolve) => {
            cancel();
            resolveWait = resolve;

            if (delay === "raf") {
                rafId = window.requestAnimationFrame(() => finish());
                return;
            }

            timeoutId = window.setTimeout(() => finish(), Math.max(0, delay));
        });

    const getState = () => ({
        hasTimeoutWait: timeoutId != null,
        hasRafWait: rafId != null,
    });

    return {
        wait,
        cancel,
        getState,
    };
};
