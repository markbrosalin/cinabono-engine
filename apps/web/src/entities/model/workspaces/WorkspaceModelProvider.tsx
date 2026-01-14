import { Component, createContext, createMemo, JSX, useContext } from "solid-js";
import { createWorkspaceModel, WorkspaceModel } from "./model";

const WorkspaceModelContext = createContext<WorkspaceModel>();

export const WorkspaceModelProvider: Component<{ children: JSX.Element }> = (props) => {
    const model = createMemo(() => createWorkspaceModel());

    return (
        <WorkspaceModelContext.Provider value={model()}>
            {props.children}
        </WorkspaceModelContext.Provider>
    );
};

export const useWorkspaceModel = () => {
    const ctx = useContext(WorkspaceModelContext);
    if (!ctx) throw new Error("useWorkspaceModel must be used within a WorkspaceModelProvider");
    return ctx;
};
