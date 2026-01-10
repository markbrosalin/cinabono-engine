import { useContext } from "solid-js";
import { TabContext } from "./tabContext";

export function useSafeTabContext() {
    const ctx = useContext(TabContext);
    if (!ctx) throw new Error("useSafeTabContext must be used within a TabContext");
    return ctx;
}
