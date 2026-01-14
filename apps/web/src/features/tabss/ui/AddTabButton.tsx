import { Component } from "solid-js";
import { PlusIcon } from "@gately/shared/assets/IconComponents";
import IconButton from "@gately/shared/ui/IconButton";
import { useOpenNewTab } from "@gately/features/tabs/useOpenNewTab";

export const AddNewTabButton: Component = () => {
    const { openNewTab } = useOpenNewTab();

    const handleClick = async () => {
        try {
            const newTab = await openNewTab();
            console.log("Tab created:", newTab);
        } catch (err) {
            console.error("Failed to create tab:", err);
        }
    };

    return (
        <IconButton
            icon={<PlusIcon />}
            class="aspect-square h-full"
            onClick={handleClick}
        ></IconButton>
    );
};
