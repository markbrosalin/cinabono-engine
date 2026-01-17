import LogoButton from "./LogoButton";
import { Component, createEffect, For } from "solid-js";
import { BarContainer } from "@gately/shared/ui";
import { useActiveTabId, useTabs } from "@gately/entities/model/tabss/hooks";
import { useWorkspaceContainer } from "@gately/entities/model/workspaces";
import { AddNewTabButton } from "./AddTabButton";
import { ScrollTabContainer } from "./ScrollTabContainer";
import { TabButton } from "./TabButton";

export const TabBar: Component<{ class?: string }> = (props) => {
    let scrollRef: HTMLDivElement | undefined;

    const activeTabId = useActiveTabId();
    const tabs = useTabs();

    createEffect(() => {
        console.log("ActiveTab: ", activeTabId());
        console.log("Tabs: ", tabs());

        const container = useWorkspaceContainer(activeTabId);

        console.log("Containers: ", container());
    });

    return (
        <>
            <BarContainer
                class={props.class}
                left={<LogoButton />}
                afterScroll={<AddNewTabButton />}
                right={<ScrollTabContainer scrollRef={scrollRef} />}
                scrollRef={(ref) => (scrollRef = ref)}
            >
                <For each={tabs()}>{(tab) => <TabButton tab={tab} />}</For>
            </BarContainer>
        </>
    );
};
