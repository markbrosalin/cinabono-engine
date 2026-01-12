import { ArrowIcon } from "@gately/shared/assets/IconComponents";
import IconButton from "@gately/shared/ui/IconButton";
import { Component } from "solid-js";

interface ScrollTabButtonProps {
    size?: number;
    direction: "left" | "right";
    disabled?: boolean;
    onClick?: () => void;
}

const ScrollTabButton: Component<ScrollTabButtonProps> = (props) => {
    return (
        <IconButton
            icon={<ArrowIcon size={props.size} direction={props.direction} />}
            class="aspect-square h-full"
            disabled={props.disabled}
            onClick={props.onClick}
        ></IconButton>
    );
};

export default ScrollTabButton;
