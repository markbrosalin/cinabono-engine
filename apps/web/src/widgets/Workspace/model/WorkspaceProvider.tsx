import { useActiveTabId } from "@gately/entities/model/tabss";
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
    workspace: Accessor<IWorkspace | undefined>;

    isDragging: Accessor<boolean>;
    setIsDragging: (value: boolean) => void;
    ready: Accessor<boolean>;
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

    const ready = () => activeTabId() !== undefined && workspace !== undefined;

    const [isDragging, setIsDragging] = createSignal(false);

    const context: IWorkspaceContext = {
        workspace,
        isDragging,
        setIsDragging,
        ready,
    };

    return <WorkspaceContext.Provider value={context}>{props.children}</WorkspaceContext.Provider>;
};

export const useWorkspace = () => {
    const ctx = useContext(WorkspaceContext);
    if (!ctx) throw new Error("useWorkspace must be used within a WorkspaceProvider");
    return ctx;
};
