import { Component, createSignal } from "solid-js";
import { IconButton } from "@gately/infrastracture/UI/shared/ui/IconButton";

interface MenuButtonProps {
    text: string;
}

export const MenuButton: Component<MenuButtonProps> = (props) => {
    const [isActive, setIsActive] = createSignal<boolean>(false);

    const toggle = () => setIsActive(!isActive());

    return (
        <IconButton
            active={isActive()}
            class="w-fit h-9 px-3 font-bold-main rounded-lg"
            text={props.text}
            onMouseDown={toggle}
        ></IconButton>
    );
};
