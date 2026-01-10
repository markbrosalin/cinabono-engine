import { events } from "@gately/domain-model/shared/event-bus";
import { useSafeEventBus } from "../../di-context/getSafeEventBus";

export const useActiveTabController = () => {
    const { eventBus } = useSafeEventBus();
    return (tabId: string) => eventBus()?.emit(events.ChangeActiveTab, { tabId });
};
