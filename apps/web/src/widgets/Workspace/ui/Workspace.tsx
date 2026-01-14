import { ViewportContext } from "@gately/shared/ui/Container/ContainerContext";
import { ViewportBoundary } from "@gately/shared/ui/Container/ContainerBoundary";
import { useDraggable } from "@gately/shared/hooks/useDraggable";
import { Component, createSignal, Show } from "solid-js";
import { MouseButton } from "@gately/shared/enum";
import { useActiveWorkspaceId, useWorkspaceActions } from "@gately/entities/model/workspaces";
import { useActiveTabId } from "@gately/entities/model/tabs";
import { useWorkspaceCtx, WorkspaceProvider } from "../model/WorkspaceProvider";

export const InnerWorkspace: Component = () => {
    const activeTabId = useActiveTabId();
    const workspaceActions = useWorkspaceActions();
    const activeWorkspaceId = useActiveWorkspaceId(activeTabId);

    const currWsCtx = useWorkspaceCtx();

    const [Aoffset, setAOffset] = createSignal({ x: 0, y: 0 });

    const draggable = useDraggable({
        button: MouseButton.MIDDLE,
        onBeginDragging: () => {},
        onDragging: (v) => {
            const wsId = activeWorkspaceId();
            const activeId = activeTabId();

            if (wsId && activeId) {
                workspaceActions.forTab(activeId)?.update(wsId, {
                    panOffset: { x: v.x, y: v.y },
                });
            }
        },
        onEndDragging: () => {},
    });

    const dragItem = useDraggable({
        onDragging: (v) => {
            setAOffset(v);
        },
    });

    return (
        <Show when={currWsCtx.workspace()}>
            {(ws) => (
                <ViewportBoundary
                    ref={draggable.bindRefToDrag}
                    class="h-full w-full border-2 bg-blue-800"
                >
                    <ViewportContext offset={() => ws().panOffset}>
                        <div
                            class="h-10 w-10 bg-amber-500 absolute left-10 top-10 z-10"
                            style={{
                                translate: `${Aoffset?.().x ?? 0}px ${Aoffset?.().y ?? 0}px`,
                            }}
                            ref={dragItem.bindRefToDrag}
                        ></div>
                    </ViewportContext>
                </ViewportBoundary>
            )}
        </Show>
    );
};

export const Workspace: Component = () => {
    return (
        <WorkspaceProvider>
            <InnerWorkspace />
        </WorkspaceProvider>
    );
};
