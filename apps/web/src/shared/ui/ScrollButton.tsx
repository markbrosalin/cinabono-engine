import { Component } from "solid-js";
import IconButton from "./IconButton";
import { ArrowIcon } from "../assets/IconComponents";
import { Direction } from "../types";

interface ScrollButtonProps {
    size?: number;
    direction: Direction;
    disabled?: boolean;
    onClick?: () => void;
    class?: string;
}

const ScrollButton: Component<ScrollButtonProps> = (props) => {
    return (
        <IconButton
            icon={<ArrowIcon size={props.size} direction={props.direction} />}
            class={props.class}
            disabled={props.disabled}
            onClick={props.onClick}
        ></IconButton>
    );
};

export default ScrollButton;
