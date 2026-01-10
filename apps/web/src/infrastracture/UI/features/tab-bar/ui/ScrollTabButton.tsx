import { Component } from "solid-js";
import { IconButton } from "@gately/infrastracture/UI/shared/ui/IconButton";
import { ArrowIcon } from "@gately/infrastracture/UI/shared/assets/IconComponents/ArrowIcon";

interface ScrollTabButtonProps {
    size?: number;
    direction: "left" | "right";
    disabled?: boolean;
    onClick?: () => void;
}

export const ScrollTabButton: Component<ScrollTabButtonProps> = (props) => {
    return (
        <IconButton
            icon={<ArrowIcon size={props.size} direction={props.direction} />}
            class="aspect-square h-full"
            disabled={props.disabled}
            onClick={props.onClick}
        ></IconButton>
    );
};
