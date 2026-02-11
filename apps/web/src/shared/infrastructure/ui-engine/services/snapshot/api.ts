import type { Graph } from "@antv/x6";
import { applySnapshot, exportSnapshot, normalizeSnapshot } from "./lib";
import type { UIEngineContext, UIScopeSnapshot } from "../../model/types";

export type SnapshotService = ReturnType<typeof useSnapshotService>;

export const useSnapshotService = (graph: Graph, _ctx: UIEngineContext) => {
    const exportScopeSnapshot = (): UIScopeSnapshot => {
        return exportSnapshot(graph);
    };

    const importScopeSnapshot = (snapshot?: Partial<UIScopeSnapshot> | null): void => {
        const normalized = normalizeSnapshot(snapshot);
        (graph as unknown as { __bridgeSilent?: boolean }).__bridgeSilent = true;
        try {
            applySnapshot(graph, normalized);
        } finally {
            (graph as unknown as { __bridgeSilent?: boolean }).__bridgeSilent = false;
        }
    };

    return { exportScopeSnapshot, importScopeSnapshot };
};
