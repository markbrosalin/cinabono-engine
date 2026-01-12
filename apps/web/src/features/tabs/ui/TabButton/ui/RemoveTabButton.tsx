import { Component, createMemo } from "solid-js";
import { tabGradientStyle } from "./RemoveTabButton.styles";
import { useApp } from "@gately/app/providers/app-context";
import { useTabs } from "@gately/features/tabs/model";
import { RemoveButton } from "@gately/shared/ui";
import { useTab } from "../model/context";

const RemoveTabButton: Component = () => {
    const appCtx = useApp();
    const tabsCtx = useTabs();
    const currTabCtx = useTab();

    const shouldShow = createMemo(
        () =>
            currTabCtx.isHovered() &&
            !currTabCtx.isTitleEditing() &&
            tabsCtx.canRemoveTab(currTabCtx.tab.id, { isEditing: currTabCtx.isTitleEditing() })
    );

    return (
        <div
            class={`absolute pointer-events-none left-0 top-0
                h-full w-full flex justify-end items-center`}
        >
            <div
                class={tabGradientStyle({
                    active: currTabCtx.isActive(),
                    showButton: shouldShow(),
                    theme: appCtx.theme(),
                })}
            />

            <RemoveButton
                onClick={() => tabsCtx.removeTab(currTabCtx.tab.id)}
                class={`z-1 pr-3 transition-opacity duration-100 ${
                    shouldShow()
                        ? "opacity-100 pointer-events-auto"
                        : "opacity-0 pointer-events-none"
                }`}
                size={10}
            />
        </div>
    );
};

export default RemoveTabButton;
