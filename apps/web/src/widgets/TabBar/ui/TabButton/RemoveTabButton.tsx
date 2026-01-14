import { Component, createMemo } from "solid-js";
import { tabGradientStyle } from "./styles";
import { useApp } from "@gately/app/providers/AppProvider";
import { RemoveButton } from "@gately/shared/ui";
import { useTabCtx } from "./TabProvider";
import { useCloseTab } from "@gately/features/tabs/useCloseTab";

const RemoveTabButton: Component = () => {
    const { closeTab, canCloseTab } = useCloseTab();
    const appCtx = useApp();
    const currTabCtx = useTabCtx();

    const shouldShow = createMemo(
        () =>
            currTabCtx.isHovered() &&
            !currTabCtx.isTitleEditing() &&
            canCloseTab(currTabCtx.tab().id, { isEditing: currTabCtx.isTitleEditing() })
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
                onClick={() => closeTab(currTabCtx.tab().id)}
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
