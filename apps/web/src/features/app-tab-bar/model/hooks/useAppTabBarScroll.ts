import { Accessor, createEffect, createSignal, onCleanup } from "solid-js";

type Options = {
    step?: number;
    wheelFactor?: number;
    epsilonPx?: number;
};

export const useAppTabBarScroll = (opts: Options = {}) => {
    const step = opts.step ?? 250;
    const wheelFactor = opts.wheelFactor ?? 0.4;
    const eps = opts.epsilonPx ?? 1;

    const [el, setEl] = createSignal<HTMLDivElement | undefined>(undefined);

    const [canBack, setCanBack] = createSignal(false);
    const [canFront, setCanFront] = createSignal(false);

    const recompute = () => {
        const node = el();
        if (!node) {
            setCanBack(false);
            setCanFront(false);
            return;
        }

        const left = node.scrollLeft;
        const maxLeft = node.scrollWidth - node.clientWidth;

        setCanBack(left > eps);
        setCanFront(left < maxLeft - eps);
    };

    const scrollBy = (dx: number) => {
        const node = el();
        if (!node) return;
        node.scrollBy({ left: dx, behavior: "smooth" });
    };

    const scrollTo = {
        backwards: () => scrollBy(-step),
        towards: () => scrollBy(step),
    };

    // bind можно вызвать когда угодно (в т.ч. позже, когда появится DOM)
    const bindRef = (node?: HTMLDivElement) => setEl(node);

    // Автоподписки на текущий элемент
    createEffect(() => {
        const node = el();
        if (!node) return;

        recompute();

        const onScroll = () => recompute();
        const onWheel = (e: WheelEvent) => {
            if (e.deltaY === 0) return;
            e.preventDefault();
            node.scrollLeft += e.deltaY * wheelFactor;
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
        bindRef,
        element: el as Accessor<HTMLDivElement | undefined>,
        scrollTo,
        isScrollableTo: {
            backwards: canBack,
            towards: canFront,
        },
        recompute,
    };
};

export type AppTabBarScrollController = ReturnType<typeof useAppTabBarScroll>;
