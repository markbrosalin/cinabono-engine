import { Component } from "solid-js";
import { PlusIcon } from "@gately/shared/assets/IconComponents";
import IconButton from "@gately/shared/ui/IconButton";
import { useTabs } from "@gately/features/tabs/model";

export const AddNewTabButton: Component = () => {
    const tabsCtx = useTabs();

    return (
        <IconButton
            icon={<PlusIcon />}
            class="aspect-square h-full"
            onClick={() => {
                tabsCtx.createTab();
            }}
        ></IconButton>
    );
};
