import { useViewport, useViewportBinding } from "@gately/shared/hooks/useViewport";
import { useWorkspace } from "./WorkspaceProvider";
import { useWorkspaceActions } from "@gately/entities/model/workspaces";
import { useActiveTabId } from "@gately/entities/model/tabss";

export const useBindZoomAndDrag = () => {
    const context = useWorkspace();
    const activeTabId = useActiveTabId();
    const wsActions = useWorkspaceActions(); // должны быть фичи а не эти

    const useViewportApi = () =>
        useViewport({
            events: {
                onBeginDragging: () => {
                    context.setIsDragging?.(true);
                },
                onDragging: (p) => {
                    const tabId = activeTabId();
                    const wsId = context.workspace()?.id;

                    if (!tabId || !wsId) return;
                    wsActions.forTab(tabId).update(wsId, {
                        offset: p,
                    });
                },
                onEndDragging: () => {
                    context.setIsDragging?.(false);
                },
                onZooming: (scale) => {
                    const tabId = activeTabId();
                    const wsId = context.workspace()?.id;

                    if (!tabId || !wsId) return;

                    wsActions.forTab(tabId).update(wsId, {
                        scale,
                    });
                },
            },
        });

    const bindZoomAndDrag = (el: HTMLDivElement) => {
        const binder = useViewportBinding(useViewportApi());
        const unbindZoom = binder.bindZoom(el);
        const unbindDrag = binder.bindDrag(el);

        return {
            unbindZoomAndDrag: () => {
                unbindZoom();
                unbindDrag();
            },
        };
    };

    return { bindZoomAndDrag };
};
