import { Component } from "solid-js";
import { AutoWidthInput } from "@gately/infrastracture/UI/shared/ui/AutoWidthInput";
import { useSafeTabsManagerContext } from "@gately/infrastracture/UI/shared/context/tab-manager-context/hooks/useSafeTabsManagerContext";
import { useSafeTabContext } from "../model/useSafeTabContext";
import {
    isEnterClicked,
    isEscapeClicked,
} from "@gately/infrastracture/UI/shared/utils/whatButtonClicked";

export const TabTitleInput: Component = () => {
    let inputRef: HTMLInputElement;

    const tabsManagerCtx = useSafeTabsManagerContext();
    const { updateTabTitle } = tabsManagerCtx;

    const tabCtx = useSafeTabContext();
    const { tab, isTabEditingSignal, title } = tabCtx;

    const [isTabEditing, setIsTabEditing] = isTabEditingSignal;

    let lastTitle = "";

    const beginEdit = () => {
        lastTitle = title();
        setIsTabEditing(true);

        queueMicrotask(() => {
            inputRef?.focus();
            inputRef?.select();
        });
    };

    const commitEdit = (e: FocusEvent & { currentTarget: HTMLInputElement }) => {
        const trimmed = e.currentTarget.value.trim();

        if (trimmed && trimmed !== title()) {
            updateTabTitle(tab()?.tabId, trimmed);
        }
        setIsTabEditing(false);
    };

    const cancelEdit = () => {
        if (inputRef) inputRef.value = lastTitle;

        setIsTabEditing(false);
    };

    const handleKeyDown = (e: KeyboardEvent & { currentTarget: HTMLInputElement }) => {
        if (isEnterClicked(e) || isEscapeClicked(e)) {
            isEscapeClicked(e) && cancelEdit();
            e.currentTarget.blur();
        }
    };

    return (
        <>
            {isTabEditing() ? (
                <div class="relative flex items-center font-bold-main overflow-auto scrollbar-hide rounded w-full h-full">
                    <AutoWidthInput
                        value={title}
                        onBlur={commitEdit}
                        onKeyDown={handleKeyDown}
                        onClick={(e) => e.stopPropagation()}
                        inputRef={(el) => (inputRef = el)}
                        maxLength={40}
                    />
                </div>
            ) : (
                <div
                    class="relative flex justify-start items-center w-full h-8"
                    ondblclick={(e) => {
                        e.stopPropagation();
                        beginEdit();
                    }}
                >
                    <span class="whitespace-nowrap">{title()}</span>
                </div>
            )}
        </>
    );
};
