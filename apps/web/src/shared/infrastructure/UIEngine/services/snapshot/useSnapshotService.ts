import { createEffect, type Accessor, type Setter } from "solid-js";
import type { Graph } from "@antv/x6";
import { applySnapshot, exportSnapshot, normalizeSnapshot } from "./snapshot";
import { UIScopeSnapshot } from "@gately/shared/infrastructure";

interface UseSnapshotServiceProps {
    graph: Accessor<Graph | undefined>;
    pendingSnapshot: Accessor<UIScopeSnapshot | null>;
    setPendingSnapshot: Setter<UIScopeSnapshot | null>;
}

export type SnapshotService = ReturnType<typeof useSnapshotService>;

export const useSnapshotService = (args: UseSnapshotServiceProps) => {
    const { graph, pendingSnapshot, setPendingSnapshot } = args;

    // apply snapshot after graph is initted
    createEffect(() => {
        const g = graph();
        const snapshot = pendingSnapshot();
        if (!g || !snapshot) return;
        applySnapshot(g, snapshot);
        setPendingSnapshot(null);
    });

    const exportScopeSnapshot = (): UIScopeSnapshot | undefined => {
        const g = graph();
        if (!g) return;
        return exportSnapshot(g);
    };

    const importScopeSnapshot = (snapshot?: Partial<UIScopeSnapshot> | null): void => {
        const normalized = normalizeSnapshot(snapshot);
        const g = graph();
        if (!g) {
            setPendingSnapshot(normalized);
            return;
        }
        applySnapshot(g, normalized);
    };

    return { exportScopeSnapshot, importScopeSnapshot };
};
