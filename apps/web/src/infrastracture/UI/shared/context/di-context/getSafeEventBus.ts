import { createMemo } from "solid-js";
import { useSafeAppCtx } from "./useSafeAppCtx";

export const useSafeEventBus = () => {
    const ctx = useSafeAppCtx();
    const eventBus = createMemo(() => ctx()?.infra.eventBus);

    return {
        eventBus,
    };
};
