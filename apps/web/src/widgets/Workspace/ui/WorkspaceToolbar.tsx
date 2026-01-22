import { Component } from "solid-js";
import { Pusher } from "@gately/shared/ui";
import { useScopeContext } from "@gately/entities/model/Scope/ScopeProvider";
import { useAddBuffer } from "@gately/features/nodes/useAddBuffer";

export const WorkspaceToolbar: Component = () => {
    const { addBuffer } = useAddBuffer();
    const scopeCtx = useScopeContext();
    const disabled = () => !scopeCtx.activeScopeId();

    return (
        <div class="absolute left-3 top-3 z-10 flex gap-2">
            <Pusher
                class="px-3 py-1 bg-gray-3 rounded-md shadow text-gray-12 hover:bg-gray-4 data-disabled:bg-gray-2 data-disabled:text-gray-8"
                onClick={addBuffer}
                disabled={disabled()}
            >
                Add Buffer
            </Pusher>
        </div>
    );
};
