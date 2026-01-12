import { Component, For } from "solid-js";
import { useTabs } from "@gately/features/tabs/model";
import LogoButton from "../../features/tabs/ui/LogoButton";
import { BarContainer } from "@gately/shared/ui";
import { AddNewTabButton, ScrollTabContainer, TabButton } from "@gately/features/tabs/ui";

const TabBar: Component<{ class?: string }> = (props) => {
    const tabsCtx = useTabs();

    let scrollRef: HTMLDivElement | undefined;

    return (
        <>
            <BarContainer
                class={props.class}
                left={<LogoButton />}
                afterScroll={<AddNewTabButton />}
                right={<ScrollTabContainer scrollRef={scrollRef} />}
                scrollRef={(ref) => (scrollRef = ref)}
            >
                <For each={tabsCtx.tabs}>{(tab) => <TabButton tab={tab} />}</For>
            </BarContainer>
        </>
    );
};

export default TabBar;
