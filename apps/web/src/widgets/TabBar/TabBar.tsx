import { Component, createEffect, For } from "solid-js";
import LogoButton from "../../features/tabss/ui/LogoButton";
import { BarContainer } from "@gately/shared/ui";
import { AddNewTabButton, ScrollTabContainer, TabButton } from "@gately/features/tabss/ui";
import { useTabs } from "@gately/entities/model/tabs/hooks";
import { useTabsModel } from "@gately/entities/model/tabs/TabsModelProvider";
import { useWorkspaceModel } from "@gately/entities/model/workspaces/WorkspaceModelProvider";
import { useActiveTabWorkspace, useTabWorkspaces } from "@gately/entities/model/workspaces";

const TabBar: Component<{ class?: string }> = (props) => {
    let scrollRef: HTMLDivElement | undefined;

    createEffect(() => {
        const tabStore = useTabsModel().store;
        const wsStore = useWorkspaceModel().store;

        console.log("ActiveTab: ", tabStore.activeTab);
        console.log("Tabs: ", tabStore.tabs);
        console.log("Containers: ", wsStore.containersByTab);

        if (!tabStore.activeTab) return;

        const activeWs = useActiveTabWorkspace(tabStore.activeTab.id);
        const tabWorkspaces = useTabWorkspaces(tabStore.activeTab.id);

        console.log("ActiveWorkspace: ", activeWs);
        console.log("Workspaces: ", tabWorkspaces);
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
                <For each={useTabs()}>{(tab) => <TabButton tab={tab} />}</For>
            </BarContainer>
        </>
    );
};

export default TabBar;
