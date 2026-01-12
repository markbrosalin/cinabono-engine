import { Component } from "solid-js";
import { PlusIcon } from "@gately/shared/assets/IconComponents";
import { useAppTabsContext } from "@gately/shared/hooks/tab";
import IconButton from "@gately/shared/ui/IconButton";

const AddNewTabButton: Component = () => {
    const tabBarContext = useAppTabsContext();

    return (
        <IconButton
            icon={<PlusIcon />}
            class="aspect-square h-full"
            onClick={() => tabBarContext.createTab()}
        ></IconButton>
    );
};

export default AddNewTabButton;
