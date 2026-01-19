import { useScroll } from "@gately/shared/hooks/useScroll";
import { ScrollButton, ScrollContainer } from "@gately/shared/ui";
import { Accessor, Component } from "solid-js";
import { TabBarButtonStyles } from "./styles";

export const TabScroller: Component<{
    scrollRef?: Accessor<HTMLDivElement | undefined>;
    class?: string;
}> = (props) => {
    const scrollCtx = useScroll({ scrollRef: props.scrollRef, step: 250, wheelFactor: 0.25 });

    return (
        <ScrollContainer axis="x" class={`${props.class}`}>
            <>
                <ScrollButton
                    onClick={() => scrollCtx.scrollTo.back()}
                    disabled={!scrollCtx.isScrollableTo.back()}
                    class={`${TabBarButtonStyles.base} center`}
                    direction="left"
                />
                <ScrollButton
                    onClick={() => scrollCtx.scrollTo.front()}
                    disabled={!scrollCtx.isScrollableTo.front()}
                    class={`${TabBarButtonStyles.base} center`}
                    direction="right"
                />
            </>
        </ScrollContainer>
    );
};
