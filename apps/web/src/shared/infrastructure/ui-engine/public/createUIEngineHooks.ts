import type {
    UIEngineErrorEvent,
    UIEngineHooks,
    UIEngineLifecycleEvent,
} from "../model/types";

export const createUIEngineHooks = (hooks?: UIEngineHooks) => {
    const emitLifecycle = (event: UIEngineLifecycleEvent): void => {
        hooks?.onLifecycle?.(event);
    };

    const reportError = (event: UIEngineErrorEvent): void => {
        hooks?.onError?.(event);
    };

    return {
        emitLifecycle,
        reportError,
    };
};
