import { LogoIcon } from "@gately/infrastracture/UI/shared/assets/IconComponents/LogoIcon";
import { IconButton } from "@gately/infrastracture/UI/shared/ui/IconButton";
import { Component, createSignal } from "solid-js";

export const LogoButton: Component = () => {
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
