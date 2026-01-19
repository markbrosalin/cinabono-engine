import { Component, Show } from "solid-js";
import { TabClose } from "./TabClose";
import { TabProvider, useTabCtx } from "./TabProvider";
import TabTitleInput from "./TabTitleInput";
import { TabScopeModel } from "@gately/entities/model/Scope/TabService";
import { Tabs } from "@kobalte/core/tabs";
import { tabEditOverlay, tabTitle, tabTrigger, tabWrap } from "../styles";

const InnerTab: Component = () => {
    const ctx = useTabCtx();

    return (
        <div
            class={`${tabWrap()}`}
            onPointerEnter={() => ctx.setIsHovered(true)}
            onPointerLeave={() => ctx.setIsHovered(false)}
        >
            <Tabs.Trigger
                value={ctx.tab().id}
                class={`${tabTrigger()}`}
                onDblClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    ctx.setIsTitleEditing(true);
                }}
            >
                <span class={tabTitle()}>{ctx.tab().name}</span>
            </Tabs.Trigger>
            <TabClose />
            <Show when={ctx.isTitleEditing()}>
                <div class={tabEditOverlay()}>
                    <TabTitleInput />
                </div>
            </Show>
        </div>
    );
};

export const Tab: Component<{ tab: TabScopeModel }> = (props) => (
    <TabProvider tab={props.tab}>
        <InnerTab />
    </TabProvider>
);
