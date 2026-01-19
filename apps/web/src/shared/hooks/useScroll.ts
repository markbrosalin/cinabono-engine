import { Accessor, createEffect, createSignal, onCleanup } from "solid-js";
import { Axis } from "../types";

type Options = {
    step?: number;
    wheelFactor?: number;
    epsilonPx?: number;
    axis?: Axis;
    scrollRef?: Accessor<HTMLDivElement | undefined>;
};

export const useScroll = (opts: Options = {}) => {
    const step = opts.step ?? 250;
    const wheelFactor = opts.wheelFactor ?? 0.4;
    const eps = opts.epsilonPx ?? 1;
    const axis = opts.axis ?? "x";
    const direction = axis === "x" ? "left" : "top";

    const [canBack, setCanBack] = createSignal(false);
    const [canFront, setCanFront] = createSignal(false);

    const recompute = () => {
        const node = opts.scrollRef?.();
        if (!node) {
            setCanBack(false);
            setCanFront(false);
            return;
        }

        const scrollPos = axis === "x" ? node.scrollLeft : node.scrollTop;
        const maxScrollPos =
            axis === "x"
                ? node.scrollWidth - node.clientWidth
                : node.scrollHeight - node.clientHeight;

        setCanBack(scrollPos > eps);
        setCanFront(scrollPos < maxScrollPos - eps);
    };

    const scrollBy = (delta: number, behavior: ScrollBehavior = "smooth") => {
        const node = opts.scrollRef?.();
        if (!node) return;

        node.scrollBy({ [direction]: delta, behavior });
    };

    const scrollTo = {
        back: () => scrollBy(-step),
        front: () => scrollBy(step),
    };

    // Автоподписки на текущий элемент
    createEffect(() => {
        const node = opts.scrollRef?.();
        if (!node) return;

        recompute();

        const onScroll = () => recompute();
        const onWheel = (e: WheelEvent) => {
            if (e.deltaY === 0) return;
            e.preventDefault();

            scrollBy(e.deltaY * wheelFactor, "instant");
        };

        node.addEventListener("scroll", onScroll, { passive: true });
        node.addEventListener("wheel", onWheel, { passive: false });

        let ro: ResizeObserver | undefined;
        if (typeof ResizeObserver !== "undefined") {
            ro = new ResizeObserver(() => recompute());
            ro.observe(node);
        }

        onCleanup(() => {
            ro?.disconnect();
            node.removeEventListener("scroll", onScroll);
            node.removeEventListener("wheel", onWheel);
        });
    });

    return {
        scrollTo,
        isScrollableTo: {
            back: canBack,
            front: canFront,
        },
    };
};
