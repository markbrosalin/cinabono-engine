import { Component } from "solid-js";
import { useAddTabController } from "@gately/infrastracture/UI/shared/context/tab-manager-context/hooks/useAddTabController";
import { IconButton } from "@gately/infrastracture/UI/shared/ui/IconButton";
import { PlusIcon } from "@gately/infrastracture/UI/shared/assets/IconComponents/PlusIcon";

export const AddNewTabButton: Component = () => {
    const onClick = useAddTabController();

    return (
        <IconButton icon={<PlusIcon />} class="aspect-square h-full" onClick={onClick}></IconButton>
    );
};
