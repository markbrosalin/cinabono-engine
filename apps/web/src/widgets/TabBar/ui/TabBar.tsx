import { LogoButton } from "./LogoButton";
import { Component, createSignal, For } from "solid-js";
import { TabAdder } from "./TabAdder";
import { TabScroller } from "./Scroller";
import { useScopeContext } from "@gately/entities/model/Scope/ScopeProvider";
import { Tabs } from "@kobalte/core/tabs";
import { Tab } from "./TabButton";
import { useOpenNewTab } from "@gately/features/tabs/useOpenTab";

export const TabBar: Component = () => {
    const [scrollEl, setScrollEl] = createSignal<HTMLDivElement>();

    const scopeCtx = useScopeContext();
    const { openTab } = useOpenNewTab();

    return (
        <Tabs
            class="bg-gray-1 flex flex-row h-10 w-full overflow-hidden"
            value={scopeCtx.activeScopeId()}
            onChange={(id) => openTab(id)}
        >
            <LogoButton class="shrink-0" />

            <Tabs.List class="flex-1 flex items-center overflow-x-hidden h-full">
                <div
                    class="flex items-center h-full overflow-x-auto scrollbar-hide"
                    ref={setScrollEl}
                >
                    <For each={scopeCtx.orderedTabs()}>{(tab) => <Tab tab={tab} />}</For>
                </div>
                <TabAdder class="shrink-0" />
            </Tabs.List>
            <TabScroller class="shrink-0 h-full" scrollRef={scrollEl} />
        </Tabs>
    );
};
