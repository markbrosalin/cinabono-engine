import { ViewportContext } from "@gately/shared/ui/Container/ContainerContext";
import { ViewportBoundary } from "@gately/shared/ui/Container/ContainerBoundary";
import { useDraggable } from "@gately/shared/hooks/useDraggable";
import { createSignal } from "solid-js";
import { MouseButton } from "@gately/shared/enum";

export const Workspace = () => {
    const [offset, setOffset] = createSignal({ x: 0, y: 0 });
    const [Aoffset, setAOffset] = createSignal({ x: 0, y: 0 });

    const draggable = useDraggable({
        button: MouseButton.MIDDLE,
        onBeginDragging: () => {},
        onDragging: (v) => {
            setOffset(v);
        },
        onEndDragging: () => {},
    });

    const dragItem = useDraggable({
        onDragging: (v) => {
            setAOffset(v);
        },
    });

    return (
        <ViewportBoundary ref={draggable.bindRefToDrag} class="h-100 w-100 border-2 bg-blue-800">
            <ViewportContext offset={offset}>
                <div
                    class="h-10 w-10 bg-amber-500 absolute left-10 top-10 z-10"
                    style={{
                        translate: `${Aoffset?.().x ?? 0}px ${Aoffset?.().y ?? 0}px`,
                    }}
                    ref={dragItem.bindRefToDrag}
                ></div>
            </ViewportContext>
        </ViewportBoundary>
    );
};
