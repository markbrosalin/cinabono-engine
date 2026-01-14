import { MouseButton } from "../enum";
import { isMouseButton } from "../lib/whatButtonClicked";
import { XYCoords } from "../ui/Container/types";
import { batch, createSignal, onCleanup, untrack } from "solid-js";

interface UseDraggableProps {
    button?: MouseButton;
    onBeginDragging?: (clientPoint: XYCoords) => void;
    onDragging?: (clientPoint: XYCoords) => void;
    onEndDragging?: (clientPoint: XYCoords) => void;
}

export const useDraggable = (props: UseDraggableProps = {}) => {
    const [offset, setOffset] = createSignal<XYCoords>({ x: 0, y: 0 });
    const [startPoint, setStartPoint] = createSignal<XYCoords | null>(null);
    const [isDragging, setIsDragging] = createSignal<boolean>(false);
    const mouseBtn = props.button ?? MouseButton.LEFT;

    function beginDrag(e: MouseEvent) {
        if (!isMouseButton(e, mouseBtn)) return;
        e.preventDefault();
        e.stopPropagation();

        batch(() => {
            const startPoint = { x: e.clientX, y: e.clientY };

            props?.onBeginDragging?.(startPoint);

            setStartPoint(startPoint);
            setIsDragging(true);
        });

        window.addEventListener("pointermove", drag);
        window.addEventListener("pointerup", endDrag);
        window.addEventListener("pointercancel", endDrag);
    }

    function drag(e: MouseEvent) {
        const dragging = untrack(() => isDragging());
        if (!dragging) return;

        const start = untrack(() => startPoint());
        const currentOffset = untrack(() => offset());

        if (!start) return;

        const delta = {
            x: e.clientX - start.x,
            y: e.clientY - start.y,
        };

        batch(() => {
            const newOffset = {
                x: currentOffset.x + delta.x,
                y: currentOffset.y + delta.y,
            };

            props.onDragging?.(newOffset);

            setOffset(newOffset);
            setStartPoint({ x: e.clientX, y: e.clientY });
        });
    }

    function endDrag(e: MouseEvent) {
        if (!isDragging()) return;

        const endPoint = { x: e.clientX, y: e.clientY };

        batch(() => {
            setStartPoint(null);
            props.onEndDragging?.(endPoint);
            setIsDragging(false);
        });

        handlePointerDown();
    }

    function bindRefToDrag(el: HTMLDivElement) {
        el.addEventListener("pointerdown", beginDrag);

        onCleanup(() => {
            el.removeEventListener("pointerdown", beginDrag);
            handlePointerUp();
        });
    }

    function handlePointerDown() {
        window.removeEventListener("pointermove", drag);
        window.removeEventListener("pointerup", endDrag);
        window.removeEventListener("pointercancel", endDrag);
    }

    function handlePointerUp() {
        window.removeEventListener("pointermove", drag);
        window.removeEventListener("pointerup", endDrag);
        window.removeEventListener("pointercancel", endDrag);
    }

    return { beginDrag, drag, endDrag, bindRefToDrag };
};
