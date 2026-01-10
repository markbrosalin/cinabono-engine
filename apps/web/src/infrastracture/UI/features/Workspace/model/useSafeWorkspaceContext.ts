import { useContext } from "solid-js";
import { WorkspaceContext, WorkspaceContextType } from "./context";

export const useSafeWorkspaceContext = (): WorkspaceContextType => {
    const ctx = useContext(WorkspaceContext);
    if (!ctx) throw new Error("useSafeWorkspaceContext must be used within a WorkspaceContext");
    return ctx;
};
