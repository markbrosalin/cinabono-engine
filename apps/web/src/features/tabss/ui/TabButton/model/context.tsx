import { ITab } from "@gately/entities/model/tabs";
import { useActiveTab } from "@gately/entities/model/tabs/hooks";
import {
    Accessor,
    Component,
    createContext,
    createMemo,
    createSignal,
    JSX,
    Setter,
    useContext,
} from "solid-js";

interface TabContext {
    tab: ITab;
    isActive: Accessor<boolean>;

    isTitleEditing: Accessor<boolean>;
    setIsTitleEditing: Setter<boolean>;

    isHovered: Accessor<boolean>;
    setIsHovered: Setter<boolean>;
}

const TabContext = createContext<TabContext>();

export const TabProvider: Component<{ tab: ITab; children: JSX.Element }> = (props) => {
    const [isTitleEditing, setIsTitleEditing] = createSignal(false);
    const [isHovered, setIsHovered] = createSignal(false);
    const isActive = createMemo(() => props.tab.id === useActiveTab()?.id);

    const context: TabContext = {
        tab: props.tab,
        isActive,
        isTitleEditing,
        setIsTitleEditing,
        isHovered,
        setIsHovered,
    };

    return <TabContext.Provider value={context}>{props.children}</TabContext.Provider>;
};

export const useTab = () => {
    const ctx = useContext(TabContext);
    if (!ctx) throw new Error("useTab must be used within a TabProvider");
    return ctx;
};
