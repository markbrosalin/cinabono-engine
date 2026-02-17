import { useAddLogicNode } from "@gately/features/nodes/useAddBaseLogic";
import {
    SIMULATION_MODE_OPTIONS,
    type SimulationMode,
} from "@gately/processes/workspace-simulation";
import { Pusher } from "@gately/shared/ui";
import { useScopeContext } from "@gately/entities/model/Scope/ScopeProvider";
import { Component, Show } from "solid-js";

type SimulationToolbarProps = {
    running: boolean;
    busy: boolean;
    mode: SimulationMode;
    disabled: boolean;
    onToggleRunning: () => void;
    onNextTick: () => void;
    onModeChange: (mode: SimulationMode) => void;
};

type WorkspaceToolbarProps = {
    simulation?: SimulationToolbarProps;
};

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
            <Show when={props.simulation}>
                {(sim) => (
                    <div class="flex items-center gap-2 px-2 py-1 rounded-md bg-gray-2/90 shadow">
                        <Pusher
                            class="px-2 py-1 bg-gray-3 rounded text-gray-12 hover:bg-gray-4 data-disabled:bg-gray-2 data-disabled:text-gray-8"
                            onClick={sim().onToggleRunning}
                            disabled={sim().disabled}
                        >
                            {sim().running ? "Pause" : "Resume"}
                        </Pusher>
                        <Pusher
                            class="px-2 py-1 bg-gray-3 rounded text-gray-12 hover:bg-gray-4 data-disabled:bg-gray-2 data-disabled:text-gray-8"
                            onClick={sim().onNextTick}
                            disabled={sim().disabled || sim().running || sim().busy}
                        >
                            Next tick
                        </Pusher>
                        <select
                            class="px-2 py-1 rounded bg-gray-3 text-gray-12 border border-gray-5"
                            value={sim().mode}
                            disabled={sim().disabled || sim().busy}
                            onChange={(e) => sim().onModeChange(e.currentTarget.value as SimulationMode)}
                        >
                            {SIMULATION_MODE_OPTIONS.map((mode) => (
                                <option value={mode.value}>{mode.label}</option>
                            ))}
                        </select>
                        <span class="text-xs text-gray-10">{sim().busy ? "running..." : "idle"}</span>
                    </div>
                )}
            </Show>

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
