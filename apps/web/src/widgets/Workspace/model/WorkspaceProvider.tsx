import { useActiveTabId } from "@gately/entities/model/tabs";
import {
    IWorkspace,
    useActiveWorkspaceId,
    useWorkspaceActions,
} from "@gately/entities/model/workspaces";
import {
    Accessor,
    Component,
    createContext,
    createMemo,
    createSignal,
    JSX,
    useContext,
} from "solid-js";

interface IWorkspaceContext {
    tabId: Accessor<string | undefined>;
    workspace: Accessor<IWorkspace | undefined>;

    isDragging?: Accessor<boolean>;
    setIsDragging?: (value: boolean) => void;

    isScaling?: Accessor<boolean>;
    setIsScaling?: (value: boolean) => void;
}

const WorkspaceContext = createContext<IWorkspaceContext>();

export const WorkspaceProvider: Component<{
    children: JSX.Element;
}> = (props) => {
    const wsActions = useWorkspaceActions();
    const activeTabId = useActiveTabId();
    const activeWorkspaceId = useActiveWorkspaceId(activeTabId);
    const workspace = createMemo(() => {
        const tabId = activeTabId();
        const wsId = activeWorkspaceId();

        if (!tabId || !wsId) return;

        const ws = wsActions.forTab(tabId).get(wsId);
        return ws;
    });

    const [isDragging, setIsDragging] = createSignal(false);
    const [isScaling, setIsScaling] = createSignal(false);

    const context: IWorkspaceContext = {
        tabId: activeTabId,
        workspace,
        isDragging,
        setIsDragging,
        isScaling,
        setIsScaling,
    };

    return <WorkspaceContext.Provider value={context}>{props.children}</WorkspaceContext.Provider>;
};

export const useWorkspaceCtx = () => {
    const ctx = useContext(WorkspaceContext);
    if (!ctx) throw new Error("useWorkspaceCtx must be used within a WorkspaceProvider");
    return ctx;
};
