import { Component, onMount } from "solid-js";
import { tabStyle } from "./Tab.style";
import TabTitle from "./TabTitle";
import { AppStates } from "@gately/shared/states";

const TabButton: Component = () => {
    let tabButtonRef: HTMLButtonElement;

    // const tabCtx = useSafeTabContext();
    // const { tab, isActive, isTabHoveredSignal } = tabCtx;

    // const makeTabActive = useActiveTabController();

    // const [isHovered, setIsHovered] = isTabHoveredSignal;

    onMount(() => {
        tabButtonRef?.focus();
    });

    return (
        <button
            ref={(el) => (tabButtonRef = el)}
            class={tabStyle({
                // active: isActive(),
                // hovered: isHovered(),
                theme: AppStates.theme(),
            })}
            onclick={() => {
                // const id = tab()?.tabId;
                // if (!isActive() && id) makeTabActive(id);
            }}
            // onmouseenter={() => setIsHovered(true)}
            // onmouseleave={() => setIsHovered(false)}
        >
            {
                <TabTitle />
                // <TabRemoveButton />
            }
        </button>
    );
};

export default TabButton;
