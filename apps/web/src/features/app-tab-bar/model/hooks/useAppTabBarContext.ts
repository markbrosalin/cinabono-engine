import { useContext } from "solid-js";
import { AppTabBarContext } from "../contexts";

export function useAppTabBarContext() {
    const ctx = useContext(AppTabBarContext);
    if (!ctx) throw new Error("useAppTabBarContext must be used within a AppTabBarContextProvider");
    return ctx;
}
