import { Component, onMount } from "solid-js";
import { TabTitleInput } from "../TabTitleInput";
import { TabRemoveButton } from "../remove-tab-button/TabRemoveButton";
import { useActiveTabController } from "@gately/infrastracture/UI/shared/context/tab-manager-context/hooks/useActiveTabController";
import { tabStyle } from "./Tab.style";
import { getTheme } from "@gately/infrastracture/AppStorage";
import { useSafeTabContext } from "../../model/useSafeTabContext";

export const TabButton: Component = () => {
    let tabButtonRef: HTMLButtonElement;

    const tabCtx = useSafeTabContext();
    const { tab, isActive, isTabHoveredSignal } = tabCtx;

    const makeTabActive = useActiveTabController();

    const [isHovered, setIsHovered] = isTabHoveredSignal;

    onMount(() => {
        tabButtonRef?.focus();
    });

    return (
        <button
            ref={(el) => (tabButtonRef = el)}
            class={tabStyle({
                active: isActive(),
                hovered: isHovered(),
                theme: getTheme(),
            })}
            onclick={() => {
                const id = tab()?.tabId;
                if (!isActive() && id) makeTabActive(id);
            }}
            onmouseenter={() => setIsHovered(true)}
            onmouseleave={() => setIsHovered(false)}
        >
            <TabTitleInput />
            <TabRemoveButton />
        </button>
    );
};
