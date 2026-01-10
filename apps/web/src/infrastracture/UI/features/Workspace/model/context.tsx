import { Accessor, Component, createContext, JSX } from "solid-js";
import { UITabData, WorkspaceSettings, XYcoords } from "@gately/infrastracture/AppStorage/types";
import { AppStorage } from "@gately/infrastracture/AppStorage";
import { useSafeTabsManagerContext } from "@gately/infrastracture/UI/shared/context/tab-manager-context/hooks/useSafeTabsManagerContext";
import { getTabIndex } from "@gately/infrastracture/AppStorage/helpers/tab-actions/getTabFromStorage";

interface WorkspaceContextProps {
    tab: Accessor<UITabData | undefined>;
    children: JSX.Element;
}

export interface WorkspaceContextType {
    preferences: WorkspaceSettings["preferences"];
    runtimeFlags: WorkspaceSettings["runtimeFlags"];
    data: WorkspaceSettings["data"];

    zoomFactor: Accessor<number>;
    setZoomFactor: (v: number) => void;

    gridOffset: Accessor<XYcoords>;
    setGridOffset: (v: XYcoords) => void;
}

export const WorkspaceContext = createContext<WorkspaceContextType>();

export const WorkspaceContextProvider: Component<WorkspaceContextProps> = (props) => {
    const tabsManagerCtx = useSafeTabsManagerContext();
    const { runtimeFlags, preferences, data } = AppStorage.WORKSPACE_SETTINGS;
    const { setTabs } = tabsManagerCtx;

    const tabIndex = () => getTabIndex(props.tab()?.tabId);
    const workspace = () => props.tab()?.WORKSPACE;

    const zoomFactor = () => workspace()?.zoomFactor ?? 1;
    const gridOffset = () => workspace()?.gridOffset ?? { x: 0, y: 0 };

    const setZoomFactor = (value: number) => {
        if (tabIndex() !== -1) setTabs(tabIndex(), "WORKSPACE", "zoomFactor", value);
    };

    const setGridOffset = (value: XYcoords) => {
        if (tabIndex() !== -1) setTabs(tabIndex(), "WORKSPACE", "gridOffset", value);
    };

    const contextValue: WorkspaceContextType = {
        runtimeFlags,
        preferences,
        data,

        zoomFactor,
        setZoomFactor,

        gridOffset,
        setGridOffset,
    };

    return (
        <WorkspaceContext.Provider value={contextValue}>{props.children}</WorkspaceContext.Provider>
    );
};
