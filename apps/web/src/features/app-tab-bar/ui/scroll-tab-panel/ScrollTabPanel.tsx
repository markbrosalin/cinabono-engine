import { Component } from "solid-js";
import ScrollTabButton from "./ScrollTabButton";
import { useAppTabBarScroll } from "../../model/hooks";

const ScrollTabPanel: Component<{ scroll: ReturnType<typeof useAppTabBarScroll> }> = (props) => {
    return (
        <>
            <ScrollTabButton
                onClick={() => props.scroll.scrollTo.backwards()}
                direction="left"
                disabled={!props.scroll.isScrollableTo.backwards()}
            />
            <ScrollTabButton
                onClick={() => props.scroll.scrollTo.towards()}
                direction="right"
                disabled={!props.scroll.isScrollableTo.towards()}
            />
        </>
    );
};

export default ScrollTabPanel;
