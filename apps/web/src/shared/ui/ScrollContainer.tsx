import { Component, JSX } from "solid-js";
import { Axis } from "../types";

const ScrollContainer: Component<{
    BackwardsBtn: JSX.Element;
    TowardsBtn: JSX.Element;
    axis?: Axis;
    class?: string;
}> = (props) => {
    const axis = props.axis ?? "x";
    const direction = axis === "x" ? "flex-row" : "flex-col";

    return (
        <div class={`flex ${direction} ${props.class}`}>
            {props.BackwardsBtn}
            {props.TowardsBtn}
        </div>
    );
};

export default ScrollContainer;
