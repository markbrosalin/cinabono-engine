import { events } from "@gately/domain-model/shared/event-bus";
import { useSafeEventBus } from "../../di-context/getSafeEventBus";

export const useAddTabController = () => {
    const { eventBus } = useSafeEventBus();
    return () => eventBus()?.emit(events.CreateTab);
};
