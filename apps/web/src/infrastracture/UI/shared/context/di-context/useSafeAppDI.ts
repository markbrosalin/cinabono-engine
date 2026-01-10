import { useContext } from "solid-js";
import { containerContext } from "./context";

export const useSafeAppDI = () => {
    const di = useContext(containerContext);
    if (!di) throw new Error("DI container is not available");
    return di;
};
