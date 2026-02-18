import { createEffect, createSignal, onCleanup } from "solid-js";
import { attachWorkspaceBridge } from "./bridge";
import { attachWorkspaceGraphInteractions } from "./graph-interactions";
import { useWorkspaceContextMenu } from "./context-menu";
import type {
    WorkspaceController,
    WorkspaceControllerDeps,
    WorkspaceSimulationController,
} from "./types";

const simulationStub: WorkspaceSimulationController = {
    running: false,
    busy: false,
    mode: "framerate" as const,
    disabled: true,
    onToggleRunning: () => void 0,
    onNextTick: () => void 0,
    onModeChange: () => void 0,
};

export const useWorkspaceController = (deps: WorkspaceControllerDeps): WorkspaceController => {
    const [selectionVersion, setSelectionVersion] = createSignal(0);
    const contextMenu = useWorkspaceContextMenu();

    const getSelectionCount = () => {
        selectionVersion();
        return deps.uiEngine.graph()?.getSelectedCellCount?.() ?? 0;
    };

    const removeSelected = () => {
        const graph = deps.uiEngine.graph();
        if (!graph?.getSelectedCells) return;
        const selected = graph.getSelectedCells();
        if (!selected.length) return;
        graph.removeCells(selected);
    };

    createEffect(() => {
        const graph = deps.uiEngine.graph();
        if (!graph) return;

        const dispose = attachWorkspaceBridge({
            graph,
            uiEngine: deps.uiEngine,
            logicEngine: deps.logicEngine,
            getActiveScopeId: deps.getActiveScopeId,
            getScopeById: deps.getScopeById,
        });

        onCleanup(dispose);
    });

    createEffect(() => {
        const graph = deps.uiEngine.graph();
        if (!graph) return;

        const dispose = attachWorkspaceGraphInteractions({
            graph,
            bumpSelection: () => setSelectionVersion((v) => v + 1),
            openContextMenuAt: contextMenu.openContextMenuAt,
            closeContextMenu: contextMenu.closeContextMenu,
            setMenuTarget: (target) => contextMenu.setMenuTarget(target),
        });

        onCleanup(dispose);
    });

    return {
        contextMenu,
        getSelectionCount,
        removeSelected,
        simulation: simulationStub,
    };
};
