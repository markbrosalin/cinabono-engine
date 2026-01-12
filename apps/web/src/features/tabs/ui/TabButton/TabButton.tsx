import { Component, onMount } from "solid-js";
import { tabStyle } from "./styles";
import TabTitleInput from "./ui/TabTitleInput";
import { useApp } from "@gately/app/providers/app-context";
import { useTabs } from "@gately/features/tabs/model";
import RemoveTabButton from "./ui/RemoveTabButton";
import { ITab } from "@gately/entities/tabs";
import { TabProvider, useTab } from "./model/context";

const InnerTabButton: Component = () => {
    const appCtx = useApp();
    const tabsCtx = useTabs();
    const currTabCtx = useTab();

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
            onclick={() => {
                const tabId = currTabCtx.tab.id;

                if (currTabCtx.isActive()) return;

                tabsCtx.openTab(tabId);
            }}
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
