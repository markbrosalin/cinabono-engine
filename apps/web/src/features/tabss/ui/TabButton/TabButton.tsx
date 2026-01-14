import { Component, onMount } from "solid-js";
import { tabStyle } from "./styles";
import { useApp } from "@gately/app/providers/AppProvider";
import RemoveTabButton from "./ui/RemoveTabButton";
import { ITab } from "@gately/entities/model/tabs";
import { TabProvider, useTab } from "./model/context";
import TabTitleInput from "./ui/TabTitleInput";
import { useOpenTab } from "@gately/features/tabs/useOpenTab";

const InnerTabButton: Component = () => {
    const appCtx = useApp();
    const currTabCtx = useTab();
    const { openTab } = useOpenTab();

    let tabButtonRef: HTMLButtonElement;

    onMount(() => {
        tabButtonRef?.focus();
    });

    return (
        <button
            ref={(el) => (tabButtonRef = el)}
            class={tabStyle({
                active: currTabCtx.isActive(),
                hovered: currTabCtx.isHovered(),
                theme: appCtx.theme(),
            })}
            onclick={() => openTab(currTabCtx.tab.id, { isActive: currTabCtx.isActive() })}
            onmouseenter={() => currTabCtx.setIsHovered(true)}
            onmouseleave={() => currTabCtx.setIsHovered(false)}
        >
            {
                <>
                    <TabTitleInput />
                    <RemoveTabButton />
                </>
            }
        </button>
    );
};

export const TabButton: Component<{ tab: ITab }> = (props) => {
    return (
        <TabProvider tab={props.tab}>
            <InnerTabButton />
        </TabProvider>
    );
};
