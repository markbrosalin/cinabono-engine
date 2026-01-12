import { Component } from "solid-js";
import { useTab } from "../model/context";
import { EditableText } from "@gately/shared/ui";
import { useTabs } from "@gately/features/tabs/model";

const TabTitleInput: Component = () => {
    const tabCtx = useTabs();
    const currTabCtx = useTab();

    return (
        <EditableText
            spanClass="h-8"
            title={() => currTabCtx.tab.title}
            updateTitle={(title) => tabCtx.updateTab({ id: currTabCtx.tab.id, title })}
            isEditing={currTabCtx.isTitleEditing}
            setIsEditing={currTabCtx.setIsTitleEditing}
        />
    );
};

export default TabTitleInput;
