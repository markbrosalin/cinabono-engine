import { useScopeContext } from "@gately/entities/model/Scope/ScopeProvider";
import { useUIEngine } from "@gately/shared/infrastructure";
import { Component, Show } from "solid-js";
import { WorkspaceToolbar } from "./WorkspaceToolbar";

export const InnerWorkspace: Component = () => {
    const ScopeCtx = useScopeContext();
    const UIEngine = useUIEngine();

    return (
        <div class="w-full h-full relative">
            <WorkspaceToolbar />
            <Show when={ScopeCtx.activeScopeId()} fallback={<p>Create a new tab</p>}>
                <div ref={UIEngine.setContainer} class="w-full h-full"></div>
            </Show>
        </div>
    );
};

export const Workspace: Component = () => {
    return <InnerWorkspace />;
};
