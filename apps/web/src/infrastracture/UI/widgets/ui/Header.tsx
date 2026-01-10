import { Component } from "solid-js";
import TabBar from "../../features/tab-bar/ui/TabBar";
import MenuBar from "../../features/menu-bar/ui/MenuBar";

const Header: Component<{ class?: string }> = (props) => {
    return (
        <div class={`flex flex-col w-full h-fit ${props.class ?? ""}`}>
            <TabBar class="z-1" />
            <MenuBar class="z-0" />
        </div>
    );
};

export default Header;
