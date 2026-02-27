import type { Graph } from "@antv/x6";
import type { PinSide, PinUpdate, UIEngineContext } from "../../model/types";
import { SIMULATION_BATCH_APPLIED_EVENT } from "../../model/events";
import { LogicValue } from "@cnbn/schema";

export type SignalService = ReturnType<typeof useSignalService>;

type SignalEventLike = {
    itemId: string;
    pin: string;
    value: LogicValue;
    kind: PinSide;
};

export const useSignalService = (_graph: Graph, ctx: UIEngineContext) => {
    const queued = new Map<string, PinUpdate>();
    let frameId: number | null = null;

    const makeUpdateKey = (update: PinUpdate): string => {
        return `${update.elementId}:${update.pinRef.side}:${update.pinRef.index}`;
    };

    const flushQueue = () => {
        frameId = null;
        if (!queued.size) return;

        const updates = Array.from(queued.values());
        queued.clear();

        ctx.getService("eventBus").emit(SIMULATION_BATCH_APPLIED_EVENT, {
            updates,
        });
    };

    const scheduleFlush = () => {
        if (frameId != null) return;

        if (typeof requestAnimationFrame === "function") {
            frameId = requestAnimationFrame(flushQueue);
            return;
        }

        frameId = setTimeout(flushQueue, 0) as unknown as number;
    };

    const applyPinPatch = (patch: PinUpdate | PinUpdate[]): void => {
        const updates = Array.isArray(patch) ? patch : [patch];
        if (!updates.length) return;

        updates.forEach((update) => {
            queued.set(makeUpdateKey(update), update);
        });

        scheduleFlush();
    };

    const applyEvents = (events: SignalEventLike | SignalEventLike[]): void => {
        const list = Array.isArray(events) ? events : [events];
        if (!list.length) return;

        applyPinPatch(
            list.map((event) => ({
                elementId: event.itemId,
                pinRef: {
                    side: event.kind,
                    index: event.pin,
                },
                value: event.value,
            })),
        );
    };

    return {
        applyPinPatch,
        applyEvents,
    };
};
