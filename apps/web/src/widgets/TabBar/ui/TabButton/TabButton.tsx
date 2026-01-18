import { Component, onMount } from "solid-js";
import { tabStyle } from "./styles";
import { useApp } from "@gately/app/providers/AppProvider";
import RemoveTabButton from "./RemoveTabButton";
import { TabProvider, useTabCtx } from "./TabProvider";
import TabTitleInput from "./TabTitleInput";
import { useOpenTab } from "@gately/features/tabs/useOpenTab";
import { TabScopeModel } from "@gately/entities/model/Scope/TabService";

const InnerTabButton: Component = () => {
    const appCtx = useApp();
    const currTabCtx = useTabCtx();
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
            onclick={() => openTab(currTabCtx.tab().id, { isActive: currTabCtx.isActive() })}
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

export const TabButton: Component<{ tab: TabScopeModel }> = (props) => {
    return (
        <TabProvider tab={props.tab}>
            <InnerTabButton />
        </TabProvider>
    );
};
