import { Component, For, onMount } from "solid-js";
import { LogoButton } from "./LogoButton";
import { AddNewTabButton } from "./AddNewTabButton";
import { TabButton } from "./tab/Tab";
import { ScrollTabButton } from "./ScrollTabButton";
import { useHorizontalScrollState } from "../lib/useHorizontalScrollState";
import { TabContextProvider } from "../model/tabContext";
import { useSafeTabsManagerContext } from "@gately/infrastracture/UI/shared/context/tab-manager-context/hooks/useSafeTabsManagerContext";
import { BarContainer } from "@gately/infrastracture/UI/shared/ui/BarContainer";

const TabBar: Component<{ class?: string }> = (props) => {
    const tabsManagerCtx = useSafeTabsManagerContext();
    const { tabs } = tabsManagerCtx;

    let tabsScrollRef: HTMLDivElement;
    const { canScrollLeft, canScrollRight } = useHorizontalScrollState(() => tabsScrollRef);

    const scrollToRight = () => {
        tabsScrollRef?.scrollBy({ left: 250, behavior: "smooth" });
    };

    const scrollToLeft = () => {
        tabsScrollRef?.scrollBy({ left: -250, behavior: "smooth" });
    };

    onMount(() => {
        tabsScrollRef.addEventListener(
            "wheel",
            (e) => {
                if (e.deltaY === 0) return;
                e.preventDefault();
                tabsScrollRef.scrollLeft += e.deltaY * 0.4;
            },
            { passive: false }
        );
    });

    return (
        <BarContainer
            class={props.class}
            left={<LogoButton />}
            afterScroll={<AddNewTabButton />}
            right={
                <>
                    <ScrollTabButton
                        onClick={scrollToLeft}
                        direction="left"
                        disabled={!canScrollLeft()}
                    />
                    <ScrollTabButton
                        onClick={scrollToRight}
                        direction="right"
                        disabled={!canScrollRight()}
                    />
                </>
            }
            scrollRef={(el) => (tabsScrollRef = el)}
        >
            <For each={Object.values(tabs)}>
                {(tab) => (
                    <TabContextProvider tab={() => tab}>
                        <TabButton />
                    </TabContextProvider>
                )}
            </For>
        </BarContainer>
    );
};

export default TabBar;
