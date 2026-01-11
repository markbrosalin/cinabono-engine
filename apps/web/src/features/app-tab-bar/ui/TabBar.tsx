import { BarContainer } from "@gately/shared/ui/bar-container/BarContainer";
import { Component, For } from "solid-js";
import { TabButton } from "./tab-button/Tab";
import { useAppTabBarContext } from "../model/hooks/useAppTabBarContext";
import { AddNewTabButton } from "./AddNewTabButton";
import { LogoButton } from "./LogoButton";
import { TabContextProvider } from "../model/contexts/tabContext";
import { ScrollTabPanel } from "./scroll-tab-panel/ScrollTabPanel";

const AppTabBar: Component<{ class?: string }> = (props) => {
    const context = useAppTabBarContext();

    return (
        <>
            <BarContainer
                class={props.class}
                left={<LogoButton />}
                afterScroll={<AddNewTabButton />}
                right={<ScrollTabPanel />}
                scrollRef={context.scroll.bindRef}
            >
                <For each={context.tabs}>
                    {(tab) => (
                        <TabContextProvider tab={tab}>
                            <TabButton />
                        </TabContextProvider>
                    )}
                </For>
            </BarContainer>
            <button
                on:click={() => context.removeTab(context.tabs.at(-1)!.id)}
                style={{ border: "1px solid black" }}
            >
                Remove Tab
            </button>
        </>
    );
};

export default AppTabBar;
