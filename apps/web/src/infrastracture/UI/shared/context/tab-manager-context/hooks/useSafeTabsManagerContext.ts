import { useContext } from "solid-js";
import { TabsManagerContext } from "../context";

export function useSafeTabsManagerContext() {
    const ctx = useContext(TabsManagerContext);
    if (!ctx) throw new Error("useSafeTabBarContext must be used within a TabBarContext");
    return ctx;
}
