import type { Graph } from "@antv/x6";
import type { CinabonoClient } from "@cnbn/engine-worker";
import type { ScopeModel } from "@gately/entities/model/Scope/types";
import type { PinUpdate as UIPinUpdate } from "@gately/shared/infrastructure/ui-engine/model/types";

export type SimulationMode =
    | "framerate";

export type SimulationSnapshot = {
    running: boolean;
    busy: boolean;
    mode: SimulationMode;
    dirty: boolean;
};

export type AttachWorkspaceSimulationManagerOptions = {
    graph: Graph;
    client: CinabonoClient;
    getActiveScopeId: () => string | undefined;
    getScopeById: (id: string) => ScopeModel | undefined;
    applyPinUpdates?: (updates: UIPinUpdate[]) => void;
};

export type WorkspaceSimulationManager = {
    getSnapshot: () => SimulationSnapshot;
    subscribe: (listener: (state: SimulationSnapshot) => void) => () => void;
    markDirty: () => void;
    setMode: (mode: SimulationMode) => void;
    pause: () => void;
    resume: () => void;
    nextTick: () => Promise<void>;
    dispose: () => void;
};
