import { useScroll } from "@gately/shared/hooks/useScroll";
import { ScrollButton, ScrollContainer } from "@gately/shared/ui";
import { Component } from "solid-js";

export const ScrollTabContainer: Component<{ scrollRef: HTMLDivElement | undefined }> = (props) => {
    const scrollCtx = useScroll({ scrollRef: props.scrollRef, step: 250, wheelFactor: 0.25 });

    return (
        <ScrollContainer
            class="h-full"
            BackwardsBtn={
                <ScrollButton
                    onClick={() => scrollCtx.scrollTo.back()}
                    disabled={!scrollCtx.isScrollableTo.back()}
                    class="aspect-square h-full"
                    direction="left"
                />
            }
            TowardsBtn={
                <ScrollButton
                    onClick={() => scrollCtx.scrollTo.front()}
                    disabled={!scrollCtx.isScrollableTo.front()}
                    class="aspect-square h-full"
                    direction="right"
                />
            }
        />
    );
};
