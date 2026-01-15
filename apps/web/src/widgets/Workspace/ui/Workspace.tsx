import { ViewportContext } from "@gately/shared/ui/Container/ContainerContext";
import { ViewportBoundary } from "@gately/shared/ui/Container/ContainerBoundary";
import { Component, createSignal, onCleanup, Show } from "solid-js";
import { useWorkspaceActions } from "@gately/entities/model/workspaces";
import { useWorkspaceCtx, WorkspaceProvider } from "../model/WorkspaceProvider";
import { WorkspaceGrid } from "./WorkspaceGrid";
import { useViewport } from "@gately/shared/hooks/useViewport/useViewport";
import { useViewportBinding } from "@gately/shared/hooks/useViewport/useViewportBinding";
import { ZERO_XY_COORDS } from "@gately/shared/config";

export const InnerWorkspace: Component = () => {
    const wsCtx = useWorkspaceCtx();
    const wsActions = useWorkspaceActions();

    const [Aoffset, setAOffset] = createSignal(ZERO_XY_COORDS);

    const viewportApi = useViewport({
        drag: {
            initial: { x: 0, y: 0 }, // изначально не устанавливается
            max: { x: 200, y: 200 },
            min: { x: -200, y: -200 },
        },
        events: {
            onBeginDragging: () => {
                console.log("BEGIN DRAGGING: ");
                wsCtx.setIsDragging?.(true);
            },
            onDragging: (p) => {
                const tabId = wsCtx.tabId();
                const wsId = wsCtx.workspace()?.id;

                if (!tabId || !wsId) return;

                wsActions.forTab(tabId).update(wsId, {
                    offset: p,
                });
                console.log("DRAGGING: ", p);
            },
            onEndDragging: () => {
                console.log("END DRAGGING: ");
                wsCtx.setIsDragging?.(false);
            },
            onZooming: (scale) => {
                const tabId = wsCtx.tabId();
                const wsId = wsCtx.workspace()?.id;

                if (!tabId || !wsId) return;

                wsActions.forTab(tabId).update(wsId, {
                    scale,
                });
                console.log("ZOOMING: ", scale);
            },
        },
    });

    const viewportBind = useViewportBinding(viewportApi);

    let unbindDrag: ReturnType<(typeof viewportBind)["bindDrag"]>;
    let unbindZoom: ReturnType<(typeof viewportBind)["bindZoom"]>;

    onCleanup(() => {
        unbindDrag?.();
        unbindZoom?.();
    });

    return (
        <Show when={wsCtx.workspace()}>
            {(ws) => {
                const offset = () => ws().offset;
                const scale = () => ws().scale;

                return (
                    <ViewportBoundary
                        ref={(el) => {
                            unbindDrag?.();
                            unbindZoom?.();

                            unbindDrag = viewportBind.bindDrag(el);
                            unbindZoom = viewportBind.bindZoom(el);
                        }}
                        class="h-full w-full border-2 bg-blue-800"
                    >
                        <ViewportContext class="z-2" offset={offset} scale={scale}>
                            <div
                                id="block"
                                class="h-10 w-10 bg-red-500 absolute left-50 top-50 z-10"
                                style={{
                                    translate: `${Aoffset?.().x ?? 0}px ${Aoffset?.().y ?? 0}px`,
                                }}
                                // ref={dragItem.bindRefToDrag}
                            ></div>
                        </ViewportContext>
                        <WorkspaceGrid
                            class="z-1"
                            offset={offset}
                            scaleFactor={scale}
                            tileUrl="@/shared/assets/workspace_tile.svg"
                        ></WorkspaceGrid>
                    </ViewportBoundary>
                );
            }}
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
