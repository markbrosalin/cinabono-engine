// import { Component } from "solid-js";
// import { tabGradientStyle } from "./button.style";
// import { useSafeTabsManagerContext } from "@gately/infrastracture/UI/shared/context/tab-manager-context/hooks/useSafeTabsManagerContext";
// import { RemoveButton } from "@gately/infrastracture/UI/shared/ui/RemoveButton";
// import { useSafeTabContext } from "../../model/useSafeTabContext";
// import { getTheme } from "@gately/infrastracture/AppStorage";
// import { useRemoveTabController } from "@gately/infrastracture/UI/shared/context/tab-manager-context/hooks/useRemoveTabController";

// export const TabRemoveButton: Component = () => {
//     const tabsManagerCtx = useSafeTabsManagerContext();
//     const { tabs } = tabsManagerCtx;
//     const removeTab = useRemoveTabController();

//     const tabCtx = useSafeTabContext();
//     const { tab, isActive, isTabEditingSignal, isTabHoveredSignal, handleDisabled } = tabCtx;

//     const [isTabEditing] = isTabEditingSignal;
//     const [isTabHovered] = isTabHoveredSignal;

//     const tabsCount = () => Object.keys(tabs).length;
//     const showRemoveButton = () => isTabHovered() && !isTabEditing() && tabsCount() > 1;

//     const handleClick = (e: MouseEvent) => {
//         e.stopPropagation();
//         const t = tab();
//         if (t) removeTab(t.tabId);
//     };

//     return (
//         <div
//             class={`absolute pointer-events-none left-0 top-0
//                 h-full w-full flex justify-end items-center`}
//         >
//             <div
//                 class={tabGradientStyle({
//                     active: isActive(),
//                     showButton: showRemoveButton(),
//                     theme: getTheme(),
//                 })}
//             />

//             <RemoveButton
//                 onClick={handleClick}
//                 class={`z-1 pr-3 transition-opacity duration-100 ${
//                     showRemoveButton()
//                         ? "opacity-100 pointer-events-auto"
//                         : "opacity-0 pointer-events-none"
//                 }`}
//                 size={10}
//                 disabled={handleDisabled()}
//             />
//         </div>
//     );
// };
