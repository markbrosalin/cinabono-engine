import { Accessor, Component, createContext, createSignal, JSX, useContext } from "solid-js";

interface IAppContext {
    theme: Accessor<"light" | "dark">;
    toggleTheme: () => void;
}

const AppContext = createContext<IAppContext>();

export const AppProvider: Component<{ children: JSX.Element }> = (props) => {
    const [theme, setTheme] = createSignal<"light" | "dark">("light");

    const context: IAppContext = {
        theme,
        toggleTheme: () => setTheme((t) => (t === "dark" ? "light" : "dark")),
    };

    return <AppContext.Provider value={context}>{props.children}</AppContext.Provider>;
};

export const useApp = () => {
    const ctx = useContext(AppContext);
    if (!ctx) throw new Error("useApp must be used within AppProvider");
    return ctx;
};
