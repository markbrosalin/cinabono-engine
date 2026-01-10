import { Component } from "solid-js";
import { BarContainer } from "@gately/infrastracture/UI/shared/ui/BarContainer";
import { MenuButton } from "./MenuButton";
import { ScrollTabButton } from "../../tab-bar/ui/ScrollTabButton";

const MenuBar: Component<{ class?: string }> = (props) => {
    return (
        <BarContainer
            class={props.class}
            left={
                <>
                    <MenuButton text="File" />
                    <MenuButton text="Edit" />
                    <MenuButton text="View" />
                    <MenuButton text="Actions" />
                    <MenuButton text="Simulation" />
                    <MenuButton text="Preferences" />
                    <MenuButton text="Help" />
                </>
            }
            right={
                <>
                    <ScrollTabButton direction="left" size={10} />
                    <MenuButton text="Trigger" />
                    <ScrollTabButton direction="left" size={10} />
                    <MenuButton text="Circuit" />
                    <ScrollTabButton direction="left" size={10} />
                    <MenuButton text="..." />
                    <ScrollTabButton direction="left" size={10} />
                    <MenuButton text="MUX-2-TO-4" />
                    <ScrollTabButton direction="left" size={10} />
                    <MenuButton text="MUX-4-TO-16" />
                    <ScrollTabButton direction="left" size={10} />
                    <MenuButton text="GLOBAL" />
                </>
            }
        ></BarContainer>
    );
};
export default MenuBar;
