import { Component } from "solid-js";
import { IconButton } from "@gately/shared/ui/IconButton";
import { useAppTabBarContext } from "../model/hooks/useAppTabBarContext";
import { PlusIcon } from "@gately/shared/assets/IconComponents/PlusIcon";

export const AddNewTabButton: Component = () => {
    const tabBarContext = useAppTabBarContext();

    return (
        <IconButton
            icon={<PlusIcon />}
            class="aspect-square h-full"
            onClick={() => tabBarContext.createTab()}
        ></IconButton>
    );
};
