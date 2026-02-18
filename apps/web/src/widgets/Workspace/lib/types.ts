import type { Graph } from "@antv/x6";
import type { CinabonoClient } from "@cnbn/engine-worker";
import type { ScopeModel } from "@gately/entities/model/Scope/types";
import type { UIEngineServices } from "@gately/shared/infrastructure/ui-engine/services";
import type { XYCoords } from "@gately/shared/types";
import type { Accessor } from "solid-js";

export type ContextTarget = "blank" | "node" | "edge";
export type AnchorReadySetter = (rect: XYCoords) => void;

export type WorkspaceSimulationMode = "framerate";

export type WorkspaceSimulationController = {
    running: boolean;
    busy: boolean;
    mode: WorkspaceSimulationMode;
    disabled: boolean;
    onToggleRunning: () => void;
    onNextTick: () => void;
    onModeChange: (mode: WorkspaceSimulationMode) => void;
};

export type WorkspaceContextMenuController = {
    menuOpen: Accessor<boolean>;
    menuTarget: Accessor<ContextTarget>;
    openContextMenuAt: (x: number, y: number, target: ContextTarget) => void;
    closeContextMenu: () => void;
    onOpenChange: (open: boolean) => void;
    setMenuTarget: (target: ContextTarget) => void;
    registerAnchorSetter: (setter: AnchorReadySetter) => void;
};

export type WorkspaceController = {
    contextMenu: WorkspaceContextMenuController;
    getSelectionCount: () => number;
    removeSelected: () => void;
    simulation: WorkspaceSimulationController;
};

export type WorkspaceUIEngine = {
    graph: () => Graph | undefined;
    services: () => UIEngineServices | undefined;
};

export type WorkspaceControllerDeps = {
    uiEngine: WorkspaceUIEngine;
    logicEngine: CinabonoClient;
    getActiveScopeId: () => string | undefined;
    getScopeById: (id: string) => ScopeModel | undefined;
};
