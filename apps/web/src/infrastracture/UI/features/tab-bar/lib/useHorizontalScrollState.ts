import { createSignal, onCleanup, onMount } from "solid-js";
import debounce from "lodash/debounce";

export function useHorizontalScrollState(containerRef: () => HTMLElement | undefined) {
    const [canScrollLeft, setLeft] = createSignal(false);
    const [canScrollRight, setRight] = createSignal(false);

    const update = debounce(() => {
        const el = containerRef();
        if (!el) return;

        const { scrollLeft, scrollWidth, clientWidth } = el;
        setLeft(scrollLeft > 0);
        setRight(scrollLeft + clientWidth < scrollWidth - 1);
    }, 50);

    onMount(() => {
        const el = containerRef();
        if (!el) return;

        const observer = new ResizeObserver(update);
        observer.observe(el);

        const mo = new MutationObserver(update);
        mo.observe(el, { childList: true, subtree: true });

        el.addEventListener("scroll", update);

        update();

        onCleanup(() => {
            observer.disconnect();
            mo.disconnect();
            el.removeEventListener("scroll", update);
            update.cancel();
        });
    });

    return { canScrollLeft, canScrollRight };
}
