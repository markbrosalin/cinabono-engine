import { createSignal } from "solid-js";

const AppStates = () => {
    const [isEngineReady, setIsEngineReady] = createSignal(false);
    const [theme, setTheme] = createSignal<"light" | "dark">("light");

    return {
        isEngineReady,
        setIsEngineReady,
        theme,
        setTheme,
    };
};

export default AppStates();
