import { ITab } from "@gately/entities/model/tabss";
import { useActiveTabId } from "@gately/entities/model/tabss/hooks";
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

interface ITabContext {
    tab: Accessor<ITab>;
    isActive: Accessor<boolean>;

    isTitleEditing: Accessor<boolean>;
    setIsTitleEditing: Setter<boolean>;

    isHovered: Accessor<boolean>;
    setIsHovered: Setter<boolean>;
}

const TabContext = createContext<ITabContext>();

export const TabProvider: Component<{ tab: ITab; children: JSX.Element }> = (props) => {
    const activeTabId = useActiveTabId();
    const tab = () => props.tab;

    const [isTitleEditing, setIsTitleEditing] = createSignal(false);
    const [isHovered, setIsHovered] = createSignal(false);
    const isActive = createMemo(() => props.tab.id === activeTabId());

    const context: ITabContext = {
        tab,
        isActive,
        isTitleEditing,
        setIsTitleEditing,
        isHovered,
        setIsHovered,
    };

    return <TabContext.Provider value={context}>{props.children}</TabContext.Provider>;
};

export const useTabCtx = () => {
    const ctx = useContext(TabContext);
    if (!ctx) throw new Error("useTabCtx must be used within a TabProvider");
    return ctx;
};
