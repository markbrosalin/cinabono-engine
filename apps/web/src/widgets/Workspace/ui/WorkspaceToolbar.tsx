import { useAddLogicNode } from "@gately/features/nodes/useAddBaseLogic";
import { Pusher } from "@gately/shared/ui";
import { useScopeContext } from "@gately/entities/model/Scope/ScopeProvider";
import type { WorkspaceController, WorkspaceSimulationMode } from "../lib/types";
import { Component } from "solid-js";

const SIMULATION_MODE_OPTIONS: Array<{ value: WorkspaceSimulationMode; label: string }> = [
    { value: "framerate", label: "framerate" },
];

type WorkspaceToolbarProps = Pick<WorkspaceController, "simulation">;

export const WorkspaceToolbar: Component<WorkspaceToolbarProps> = (props) => {
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
        <div class="absolute left-3 top-3 z-10 flex flex-col gap-2">
            <div class="flex items-center gap-2 px-2 py-1 rounded-md bg-gray-2/90 shadow">
                <Pusher
                    class="px-2 py-1 bg-gray-3 rounded text-gray-12 hover:bg-gray-4 data-disabled:bg-gray-2 data-disabled:text-gray-8"
                    onClick={props.simulation.onToggleRunning}
                    disabled={props.simulation.disabled}
                >
                    {props.simulation.running ? "Pause" : "Resume"}
                </Pusher>
                <Pusher
                    class="px-2 py-1 bg-gray-3 rounded text-gray-12 hover:bg-gray-4 data-disabled:bg-gray-2 data-disabled:text-gray-8"
                    onClick={props.simulation.onNextTick}
                    disabled={
                        props.simulation.disabled ||
                        props.simulation.running ||
                        props.simulation.busy
                    }
                >
                    Next tick
                </Pusher>
                <select
                    class="px-2 py-1 rounded bg-gray-3 text-gray-12 border border-gray-5"
                    value={props.simulation.mode}
                    disabled={props.simulation.disabled || props.simulation.busy}
                    onChange={(e) =>
                        props.simulation.onModeChange(
                            e.currentTarget.value as WorkspaceSimulationMode,
                        )
                    }
                >
                    {SIMULATION_MODE_OPTIONS.map((mode) => (
                        <option value={mode.value}>{mode.label}</option>
                    ))}
                </select>
                <span class="text-xs text-gray-10">
                    {props.simulation.busy ? "running..." : "idle"}
                </span>
            </div>

            <div class="flex gap-2">
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
        </div>
    );
};
