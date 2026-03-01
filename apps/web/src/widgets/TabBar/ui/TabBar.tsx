import { LogoButton } from "./LogoButton";
import { Component, For, onMount } from "solid-js";
import { TabAdder } from "./TabAdder";
import { useScopeContext } from "@gately/entities/model/Scope/ScopeProvider";
import { Tabs } from "@kobalte/core/tabs";
import { Tab } from "./TabButton";
import { TabScroller } from "./TabScroller";
import { ListScroller } from "@gately/shared/ui/ListScroller/ListScroller";
import { useOpenNewTab } from "@gately/features/tabs/useOpenTab";

export const TabBar: Component = () => {
    const scopeCtx = useScopeContext();
    const firstTab = useOpenNewTab();

    onMount(() => {
        firstTab.openNewTab();
    });

    return (
        <ListScroller
            activeKey={scopeCtx.activeTabId}
            step={150}
            wheelMultiplier={0.25}
            behavior="smooth"
            padding={0}
        >
            <Tabs
                class="bg-gray-12 flex flex-row h-10 w-full overflow-hidden"
                value={scopeCtx.activeTabId()}
            >
                <LogoButton class="shrink-0" />

                <Tabs.List class="flex-1 flex items-center overflow-x-hidden h-full">
                    <ListScroller.List class="flex items-center h-full overflow-x-auto scrollbar-hide">
                        <For each={scopeCtx.orderedTabs()}>{(tab) => <Tab tab={tab} />}</For>
                    </ListScroller.List>
                    <TabAdder class="shrink-0" />
                </Tabs.List>
                <TabScroller class="shrink-0 h-full" />
            </Tabs>
        </ListScroller>
    );
};
