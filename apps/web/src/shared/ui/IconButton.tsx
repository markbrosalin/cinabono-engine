import { Component, JSX } from "solid-js";

interface IconButtonProps {
    icon?: JSX.Element;
    text?: string;
    class?: string;
    disabled?: boolean;
    active?: boolean;
    onClick?: (e: MouseEvent) => void;
    onMouseDown?: (e: MouseEvent) => void;
}

const IconButton: Component<IconButtonProps> = (props) => {
    return (
        <button
            disabled={props.disabled}
            class={`
                flex items-center justify-center outline-0
                ${
                    props.active
                        ? "text-gray-50 bg-indigo-500 z-20"
                        : `text-gray-500 bg-gray-900 
                            hover:text-gray-50 hover:bg-gray-800
                            active:bg-indigo-500 active:text-gray-50`
                }
                ${props.class ?? ""}
            `}
            classList={{
                "text-gray-700 cursor-not-allowed pointer-events-none": props.disabled,
            }}
            onclick={(e) => props.onClick?.(e)}
            onmousedown={(e) => props.onMouseDown?.(e)}
        >
            {props.icon}
            {props.text && <span class="flex items-center justify-center">{props.text}</span>}
        </button>
    );
};

export default IconButton;
