import { Component } from "solid-js";
import { ScrollTabButton } from "./ScrollTabButton";
import { useAppTabBarContext } from "../../model/hooks/useAppTabBarContext";

export const ScrollTabPanel: Component = () => {
    const ctx = useAppTabBarContext();

    return (
        <>
            <ScrollTabButton
                onClick={() => ctx.scroll.scrollTo.backwards()}
                direction="left"
                disabled={!ctx.scroll.isScrollableTo.backwards()}
            />
            <ScrollTabButton
                onClick={() => ctx.scroll.scrollTo.towards()}
                direction="right"
                disabled={!ctx.scroll.isScrollableTo.towards()}
            />
        </>
    );
};
