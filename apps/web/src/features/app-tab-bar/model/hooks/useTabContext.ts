import { useContext } from "solid-js";
import { TabContext } from "../contexts/tabContext";

export function useTabContext() {
    const ctx = useContext(TabContext);
    if (!ctx) throw new Error("useTabContext must be used within a TabContextProvider");
    return ctx;
}
