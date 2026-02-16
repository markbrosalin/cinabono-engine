import { Component } from "solid-js";
import { Pusher } from "@gately/shared/ui";
import { useScopeContext } from "@gately/entities/model/Scope/ScopeProvider";
import { useAddLogicNode } from "@gately/features/nodes/useAddBaseLogic";

export const WorkspaceToolbar: Component = () => {
    const {
        addBuffer,
        addAnd,
        addOr,
        addNot,
        addNor,
        addNand,
        addXor,
        addXnor,
        addToggle,
        addLamp,
    } = useAddLogicNode();
    const scopeCtx = useScopeContext();
    const disabled = () => !scopeCtx.activeScopeId();

    return (
        <div class="absolute left-3 top-3 z-10 flex gap-2">
            <Pusher
                class="px-3 py-1 bg-gray-3 rounded-md shadow text-gray-12 hover:bg-gray-4 data-disabled:bg-gray-2 data-disabled:text-gray-8"
                onClick={addToggle}
                disabled={disabled()}
            >
                Add TOGGLE
            </Pusher>
            <Pusher
                class="px-3 py-1 bg-gray-3 rounded-md shadow text-gray-12 hover:bg-gray-4 data-disabled:bg-gray-2 data-disabled:text-gray-8"
                onClick={addLamp}
                disabled={disabled()}
            >
                Add LAMP
            </Pusher>
            <Pusher
                class="px-3 py-1 bg-gray-3 rounded-md shadow text-gray-12 hover:bg-gray-4 data-disabled:bg-gray-2 data-disabled:text-gray-8"
                onClick={addBuffer}
                disabled={disabled()}
            >
                Add Buffer
            </Pusher>
            <Pusher
                class="px-3 py-1 bg-gray-3 rounded-md shadow text-gray-12 hover:bg-gray-4 data-disabled:bg-gray-2 data-disabled:text-gray-8"
                onClick={addAnd}
                disabled={disabled()}
            >
                Add AND
            </Pusher>
            <Pusher
                class="px-3 py-1 bg-gray-3 rounded-md shadow text-gray-12 hover:bg-gray-4 data-disabled:bg-gray-2 data-disabled:text-gray-8"
                onClick={addOr}
                disabled={disabled()}
            >
                Add OR
            </Pusher>
            <Pusher
                class="px-3 py-1 bg-gray-3 rounded-md shadow text-gray-12 hover:bg-gray-4 data-disabled:bg-gray-2 data-disabled:text-gray-8"
                onClick={addNot}
                disabled={disabled()}
            >
                Add NOT
            </Pusher>
            <Pusher
                class="px-3 py-1 bg-gray-3 rounded-md shadow text-gray-12 hover:bg-gray-4 data-disabled:bg-gray-2 data-disabled:text-gray-8"
                onClick={addNor}
                disabled={disabled()}
            >
                Add NOR
            </Pusher>
            <Pusher
                class="px-3 py-1 bg-gray-3 rounded-md shadow text-gray-12 hover:bg-gray-4 data-disabled:bg-gray-2 data-disabled:text-gray-8"
                onClick={addNand}
                disabled={disabled()}
            >
                Add NAND
            </Pusher>
            <Pusher
                class="px-3 py-1 bg-gray-3 rounded-md shadow text-gray-12 hover:bg-gray-4 data-disabled:bg-gray-2 data-disabled:text-gray-8"
                onClick={addXor}
                disabled={disabled()}
            >
                Add XOR
            </Pusher>
            <Pusher
                class="px-3 py-1 bg-gray-3 rounded-md shadow text-gray-12 hover:bg-gray-4 data-disabled:bg-gray-2 data-disabled:text-gray-8"
                onClick={addXnor}
                disabled={disabled()}
            >
                Add XNOR
            </Pusher>
        </div>
    );
};
