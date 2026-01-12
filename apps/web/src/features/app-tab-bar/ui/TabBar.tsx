import { Component, For } from "solid-js";
import AddNewTabButton from "./AddNewTabButton";
import { TabContextProvider } from "../model/contexts/tabContext";
import { useAppTabBarScroll } from "../model/hooks/useAppTabBarScroll";
import { useAppTabsContext } from "@gately/shared/hooks/tab";
import { BarContainer } from "@gately/shared/ui";
import { ScrollTabPanel } from "./scroll-tab-panel";
import LogoButton from "./LogoButton";
import TabButton from "./tab-button/Tab";

const AppTabBar: Component<{ class?: string }> = (props) => {
    const context = useAppTabsContext();
    const scroll = useAppTabBarScroll({ step: 250, wheelFactor: 0.4 });

    return (
        <>
            <BarContainer
                class={props.class}
                left={<LogoButton />}
                afterScroll={<AddNewTabButton />}
                right={<ScrollTabPanel scroll={scroll} />}
                scrollRef={scroll.bindRef}
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
