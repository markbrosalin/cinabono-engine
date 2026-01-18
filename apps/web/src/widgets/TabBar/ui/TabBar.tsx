import LogoButton from "./LogoButton";
import { Component, For } from "solid-js";
import { BarContainer } from "@gately/shared/ui";
import { AddNewTabButton } from "./AddTabButton";
import { ScrollTabContainer } from "./ScrollTabContainer";
import { TabButton } from "./TabButton";
import { useScopeContext } from "@gately/entities/model/Scope/ScopeProvider";

export const TabBar: Component<{ class?: string }> = (props) => {
    let scrollRef: HTMLDivElement | undefined;

    const scopeCtx = useScopeContext();

    return (
        <BarContainer
            class={`bg-primary-1 ${props.class}`}
            left={<LogoButton />}
            afterScroll={<AddNewTabButton />}
            right={<ScrollTabContainer scrollRef={scrollRef} />}
            scrollRef={(ref) => (scrollRef = ref)}
        >
            <For each={scopeCtx.orderedTabs()}>{(tab) => <TabButton tab={tab} />}</For>
        </BarContainer>
    );
};
