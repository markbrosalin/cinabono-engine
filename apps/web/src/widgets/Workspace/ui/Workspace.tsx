import { useScopeContext } from "@gately/entities/model/Scope/ScopeProvider";
import { useUIEngine } from "@gately/shared/infrastructure";
import { useLogicEngine } from "@gately/shared/infrastructure/LogicEngine";
import { Component, Show } from "solid-js";
import { useWorkspaceController } from "../lib";
import { WorkspaceContextMenu } from "./WorkspaceContextMenu";
import { WorkspaceToolbar } from "./WorkspaceToolbar";

export const InnerWorkspace: Component = () => {
    const scopeContext = useScopeContext();
    const uiEngine = useUIEngine();
    const logicEngine = useLogicEngine();
    const controller = useWorkspaceController({
        uiEngine,
        logicEngine,
        getActiveScopeId: scopeContext.activeScopeId,
        getScopeById: scopeContext.getScope,
    });

    return (
        <div class="w-full h-full relative">
            <WorkspaceToolbar simulation={controller.simulation} />
            <Show when={scopeContext.activeScopeId()} fallback={<p>Create a new tab</p>}>
                <div ref={uiEngine.setContainer} class="w-full h-full"></div>
                <WorkspaceContextMenu
                    contextMenu={controller.contextMenu}
                    getSelectionCount={controller.getSelectionCount}
                    removeSelected={controller.removeSelected}
                />
            </Show>
        </div>
    );
};

export const Workspace: Component = () => {
    return <InnerWorkspace />;
};
