import {
    Accessor,
    Component,
    createContext,
    createEffect,
    createSignal,
    JSX,
    Signal,
} from "solid-js";
import { useSafeTabsManagerContext } from "@gately/infrastracture/UI/shared/context/tab-manager-context/hooks/useSafeTabsManagerContext";
import { UITabData } from "@gately/infrastracture/AppStorage";

interface TabContextProps {
    tab: Accessor<UITabData | undefined>;
    children: JSX.Element;
}

export interface TabContextType {
    tab: Accessor<UITabData | undefined>;
    title: Accessor<string>;
    isActive: Accessor<boolean>;

    handleDisabled: () => boolean;
    isTabHoveredSignal: Signal<boolean>;
    isTabEditingSignal: Signal<boolean>;
}

export const TabContext = createContext<TabContextType>();

export const TabContextProvider: Component<TabContextProps> = (props) => {
    const tabsManagerCtx = useSafeTabsManagerContext();
    const { runtimeFlags, ActiveTabId } = tabsManagerCtx;

    const isActive = () => ActiveTabId() === props.tab()?.tabId;
    const title = () => props.tab()?.title ?? "";
    const handleDisabled = () => !props.tab()?.isLoaded;

    //Local flags of Tab
    const isTabHoveredSignal = createSignal(false);
    const isTabEditingSignal = createSignal(false);

    //Global flags of App
    const [, SetIsTabHovered] = runtimeFlags.IsTabHovered;
    const [, SetIsTabEditing] = runtimeFlags.IsTabEditing;

    createEffect(() => SetIsTabEditing(isTabEditingSignal[0]()));
    createEffect(() => SetIsTabHovered(isTabHoveredSignal[0]()));

    const contextValue: TabContextType = {
        tab: props.tab,
        title,
        isActive,

        handleDisabled,
        isTabHoveredSignal,
        isTabEditingSignal,
    };

    return <TabContext.Provider value={contextValue}>{props.children}</TabContext.Provider>;
};
