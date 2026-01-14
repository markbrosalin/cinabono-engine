import { LogoIcon } from "@gately/shared/assets/IconComponents";
import IconButton from "@gately/shared/ui/IconButton";
import { Component, createSignal } from "solid-js";

const LogoButton: Component = () => {
    const [isActive, setIsActive] = createSignal(false);

    const toggle = () => setIsActive((prev) => !prev);

    return (
        <IconButton
            class="aspect-square h-full"
            active={isActive()}
            icon={isActive() ? <LogoIcon type="pressed" /> : <LogoIcon type="default" />}
            onMouseDown={toggle}
        />
    );
};

export default LogoButton;
