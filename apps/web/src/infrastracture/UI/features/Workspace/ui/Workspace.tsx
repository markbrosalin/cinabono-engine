import { canZoom } from "@gately/infrastracture/UI/shared/utils/canZoom";
import { isMiddleButton } from "@gately/infrastracture/UI/shared/utils/whatButtonClicked";
import { batch, Component, createSignal, onCleanup, onMount, untrack } from "solid-js";
import { useSafeWorkspaceContext } from "../model/useSafeWorkspaceContext";
import { XYcoords } from "@gately/infrastracture/AppStorage/types";

const Workspace: Component<{ class?: string }> = (props) => {
    let wrapperRef: HTMLDivElement;
    let workspaceRef: HTMLDivElement;
    const workspaceCtx = useSafeWorkspaceContext();
    const { runtimeFlags, preferences, zoomFactor, setZoomFactor, gridOffset, setGridOffset } =
        workspaceCtx;

    const [IsGridDragging, SetIsGridDragging] = runtimeFlags.IsGridDragging;
    const [, SetIsGridZooming] = runtimeFlags.IsGridZooming;
    const ZOOM_LIMITS = preferences.ZOOM_LIMITS;

    const [startDrag, setStartDrag] = createSignal<XYcoords>({ x: 0, y: 0 });

    onMount(() => {
        if (!workspaceRef || !wrapperRef) return;

        wrapperRef.addEventListener("click", (e) => {
            const rect = wrapperRef.getBoundingClientRect();
            const el = document.createElement("div");

            const mouseScreen = {
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
            };

            const mouseWorld = ScreenToWorld(mouseScreen);

            el.className = "absolute w-[18px] h-[18px] bg-amber-400";
            el.style.left = `${mouseWorld.x / zoomFactor() - 0}px`;
            el.style.top = `${mouseWorld.y / zoomFactor() - 0}px`;

            workspaceRef.appendChild(el);
        });

        wrapperRef.addEventListener("wheel", onMouseWheel, { passive: false });
        window.addEventListener("pointerup", onMouseUpHandler);
        window.addEventListener("pointermove", onMouseMoveHandler);

        onCleanup(() => {
            wrapperRef.removeEventListener("wheel", onMouseWheel);
            window.removeEventListener("pointerup", onMouseUpHandler);
            window.removeEventListener("pointermove", onMouseMoveHandler);
        });
    });

    const ScreenToWorld = ({ x: screenX, y: screenY }: XYcoords): XYcoords => {
        const { x: offsetX, y: offsetY } = untrack(() => gridOffset());

        return {
            x: screenX + offsetX,
            y: screenY + offsetY,
        };
    };

    const onMouseWheel = (e: WheelEvent) => {
        e.preventDefault();
        SetIsGridZooming(true);

        const [lastScale, currentOffset] = untrack(() => [zoomFactor(), gridOffset()]);

        if (!canZoom(e.deltaY, lastScale, ZOOM_LIMITS)) return;

        const rect = wrapperRef.getBoundingClientRect();
        const mouseScreen = { x: e.clientX - rect.left, y: e.clientY - rect.top };

        // Переводим экранную точку в мировые координаты
        const mouseWorldBefore = ScreenToWorld(mouseScreen);

        // Считаем новый масштаб
        const k = Math.exp(-e.deltaY * 0.001);
        const newScale = Math.min(Math.max(ZOOM_LIMITS.min, lastScale * k), ZOOM_LIMITS.max);

        // Вычисляем поправку смещения, чтобы зум был «под мышью»
        const factor = newScale / lastScale - 1;
        const offsetX = Math.round(mouseWorldBefore.x * factor);
        const offsetY = Math.round(mouseWorldBefore.y * factor);

        batch(() => {
            setZoomFactor(newScale);
            setGridOffset({
                x: currentOffset.x + offsetX,
                y: currentOffset.y + offsetY,
            });
            SetIsGridZooming(false);
        });
    };

    const onMouseDownHandler = (e: MouseEvent) => {
        if (!isMiddleButton(e)) return;
        e.preventDefault();

        batch(() => {
            SetIsGridDragging(true);
            setStartDrag({ x: e.clientX, y: e.clientY });
        });
    };

    const onMouseMoveHandler = (e: MouseEvent) => {
        const dragging = untrack(() => IsGridDragging());
        if (!dragging) return;

        const { x: startX, y: startY } = untrack(() => startDrag());
        const { x: offsetX, y: offsetY } = untrack(() => gridOffset());

        const deltaMouseX = e.clientX - startX;
        const deltaMouseY = e.clientY - startY;

        const newX = Math.round(offsetX - deltaMouseX);
        const newY = Math.round(offsetY - deltaMouseY);

        batch(() => {
            setGridOffset({ x: newX, y: newY });
            setStartDrag({ x: e.clientX, y: e.clientY });
        });

        e.preventDefault();
    };

    const onMouseUpHandler = () => {
        SetIsGridDragging(false);
    };

    return (
        <div
            id="workspace-wrapper"
            ref={(el) => (wrapperRef = el)}
            onPointerDown={onMouseDownHandler}
            class={`w-full h-full border-1 relative overflow-auto scrollbar-hide ${props.class}}`}
        >
            <div
                id="workspace"
                ref={(el) => (workspaceRef = el)}
                class={`absolute w-fit h-fit z-2 ${
                    IsGridDragging() ? "cursor-grabbing" : "cursor-grab"
                }`}
                style={{
                    transform: `translate(${-gridOffset().x}px, ${-gridOffset()
                        .y}px) scale(${zoomFactor()})`,
                    "transform-origin": "0 0",
                }}
            ></div>
            <div
                id="grid"
                class="z-1 absolute w-full h-full bg-[url(@/infrastracture/UI/shared/assets/workspace_tile.svg)]"
                style={{
                    "background-position": `${-gridOffset().x}px ${-gridOffset().y}px`,
                    "background-size": `${zoomFactor() * 16}px ${zoomFactor() * 16}px`,
                }}
            ></div>
        </div>
    );
};

export default Workspace;
