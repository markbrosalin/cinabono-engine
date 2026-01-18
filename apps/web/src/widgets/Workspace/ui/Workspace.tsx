import { useScopeContext } from "@gately/entities/model/Scope/ScopeProvider";
import { useUIEngine } from "@gately/shared/infrastructure";
import { Component, Show } from "solid-js";
import { WorkspaceProvider } from "../model/WorkspaceProvider";

export const InnerWorkspace: Component = () => {
    const ScopeCtx = useScopeContext();
    const UIEngine = useUIEngine();

    return (
        <div class="w-full h-full relative">
            <Show when={ScopeCtx.activeScopeId()} fallback={<p>Create a new tab</p>}>
                <div ref={UIEngine.setContainer} class="w-full h-full"></div>
            </Show>
        </div>
    );
};

// export const InnerWorkspace: Component = () => {
//     const context = useWorkspace();

//     const [view, setView] = createSignal<HTMLDivElement>();

//     const { bindZoomAndDrag } = useBindZoomAndDrag();

//     createEffect(() => {
//         const el = view();
//         if (!el || !context.ready()) return;

//         const { unbindZoomAndDrag } = bindZoomAndDrag(el);

//         onCleanup(() => {
//             unbindZoomAndDrag();
//         });
//     });

//     return (
//         <Show when={context.workspace()}>
//             {(ws) => {
//                 const offset = () => ws().offset;
//                 const scale = () => ws().scale;

//                 return (
//                     <ViewportBoundary ref={setView} class="h-full w-full border-2 bg-blue-800">
//                         <ViewportContext class="z-2" offset={offset} scale={scale}>
//                             <div
//                                 id="block"
//                                 class="h-10 w-10 bg-red-500 absolute left-50 top-50 z-10"
//                             ></div>
//                         </ViewportContext>
//                         <WorkspaceGrid
//                             class="z-1"
//                             offset={offset}
//                             scaleFactor={scale}
//                             tileUrl="@/shared/assets/workspace_tile.svg"
//                         ></WorkspaceGrid>
//                     </ViewportBoundary>
//                 );
//             }}
//         </Show>
//     );
// };

export const Workspace: Component = () => {
    return (
        <WorkspaceProvider>
            <InnerWorkspace />
        </WorkspaceProvider>
    );
};
