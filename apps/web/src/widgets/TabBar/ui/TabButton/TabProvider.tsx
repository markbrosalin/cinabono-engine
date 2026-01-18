import { useScopeContext } from "@gately/entities/model/Scope/ScopeProvider";
import { TabScopeModel } from "@gately/entities/model/Scope/TabService";
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
    tab: Accessor<TabScopeModel>;
    isActive: Accessor<boolean>;

    isTitleEditing: Accessor<boolean>;
    setIsTitleEditing: Setter<boolean>;

    isHovered: Accessor<boolean>;
    setIsHovered: Setter<boolean>;
}

const TabContext = createContext<TabContext>();

export const TabProvider: Component<{ tab: TabScopeModel; children: JSX.Element }> = (props) => {
    const scopeCtx = useScopeContext();
    const tab = () => props.tab;

    const [isTitleEditing, setIsTitleEditing] = createSignal(false);
    const [isHovered, setIsHovered] = createSignal(false);
    const isActive = createMemo(() => props.tab.id === scopeCtx.activeScopeId());

    const context: TabContext = {
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
