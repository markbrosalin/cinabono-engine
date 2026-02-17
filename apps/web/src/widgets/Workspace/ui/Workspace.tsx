/* eslint-disable @typescript-eslint/no-explicit-any */
import { useScopeContext } from "@gately/entities/model/Scope/ScopeProvider";
import { useUIEngine } from "@gately/shared/infrastructure";
import { useLogicEngine } from "@gately/shared/infrastructure/LogicEngine";
import { attachWorkspaceBridge } from "@gately/processes/workspace-sync";
import {
    attachWorkspaceSimulationManager,
    type SimulationMode,
    type WorkspaceSimulationManager,
} from "@gately/processes/workspace-simulation";
import {
    ContextMenu,
    ContextMenuRootProps,
    useContextMenuContext,
} from "@kobalte/core/context-menu";
import { contextMenuStyles as styles } from "@gately/shared/ui/ContextMenu/styles";
import { Component, ParentComponent, Show, createEffect, createSignal, onCleanup } from "solid-js";
import { WorkspaceToolbar } from "./WorkspaceToolbar";

type ContextTarget = "blank" | "node" | "edge";

const ContextMenuRoot = ContextMenu as ParentComponent<ContextMenuRootProps & { open: boolean }>;

const ContextMenuAnchorBridge: Component<{
    onReady: (setter: (rect: { x: number; y: number }) => void) => void;
}> = (props) => {
    const ctx = useContextMenuContext();
    createEffect(() => {
        props.onReady(ctx.setAnchorRect);
    });
    return null;
};

export const InnerWorkspace: Component = () => {
    const ScopeCtx = useScopeContext();
    const UIEngine = useUIEngine();
    const LogicEngine = useLogicEngine();
    let simulationManager: WorkspaceSimulationManager | null = null;

    const [selectionVersion, setSelectionVersion] = createSignal(0);
    const [menuOpen, setMenuOpen] = createSignal(false);
    const [menuTarget, setMenuTarget] = createSignal<ContextTarget>("blank");
    const [menuPoint, setMenuPoint] = createSignal<{ x: number; y: number } | null>(null);
    const [simulationState, setSimulationState] = createSignal({
        running: true,
        busy: false,
        mode: "framerate" as SimulationMode,
        dirty: false,
    });
    let setAnchorRect: ((rect: { x: number; y: number }) => void) | undefined;

    const getSelectionCount = () => {
        selectionVersion();
        return UIEngine.graph?.()?.getSelectedCellCount?.() ?? 0;
    };

    const removeSelected = () => {
        const graph = UIEngine.graph?.();
        if (!graph?.getSelectedCells) return;
        const selected = graph.getSelectedCells();
        if (!selected.length) return;
        graph.removeCells(selected);
    };

    const shouldIgnoreKey = (e: KeyboardEvent) => {
        const target = e.target as HTMLElement | null;
        if (!target) return false;
        const tag = target.tagName?.toLowerCase();
        if (tag === "input" || tag === "textarea" || tag === "select") return true;
        if (target.isContentEditable) return true;
        return false;
    };

    const openContextMenuAt = (x: number, y: number, target: ContextTarget) => {
        setMenuTarget(target);
        setMenuPoint({ x, y });
        setAnchorRect?.({ x, y });
        setMenuOpen(true);
    };

    const closeContextMenu = () => {
        setMenuOpen(false);
    };

    createEffect(() => {
        const graph = UIEngine.graph?.();
        const services = UIEngine.services();
        if (!graph || !services) return;

        const manager = attachWorkspaceSimulationManager({
            graph,
            client: LogicEngine,
            getActiveScopeId: ScopeCtx.activeScopeId,
            getScopeById: ScopeCtx.getScope,
            applyPinUpdates: services.ports?.applyPinUpdates,
        });
        simulationManager = manager;
        const offManagerState = manager.subscribe((state) => setSimulationState(state));

        const dispose = attachWorkspaceBridge({
            graph,
            client: LogicEngine,
            getActiveScopeId: ScopeCtx.activeScopeId,
            getScopeById: ScopeCtx.getScope,
            markDirty: manager.markDirty,
        });

        onCleanup(() => {
            dispose();
            offManagerState?.();
            manager.dispose();
            if (simulationManager === manager) simulationManager = null;
        });
    });

    createEffect(() => {
        const graph = UIEngine.graph?.();
        if (!graph) return;

        const bumpSelection = () => setSelectionVersion((v) => v + 1);
        const EDGE_SELECTED_CLASS = "edge-selected";

        const addEdgeSelectedClass = (edge: any) => {
            const current = (edge?.getAttrByPath?.("line/class") ?? "") as string;
            const tokens = current.split(/\s+/).filter(Boolean);
            if (tokens.includes(EDGE_SELECTED_CLASS)) return;
            tokens.push(EDGE_SELECTED_CLASS);
            edge?.setAttrByPath?.("line/class", tokens.join(" ").trim());
        };

        const removeEdgeSelectedClass = (edge: any) => {
            const current = (edge?.getAttrByPath?.("line/class") ?? "") as string;
            const tokens = current.split(/\s+/).filter(Boolean);
            const next = tokens.filter((t) => t !== EDGE_SELECTED_CLASS);
            edge?.setAttrByPath?.("line/class", next.join(" ").trim());
        };

        const enforceNodePriority = () => {
            const selected = graph.getSelectedCells?.() ?? [];
            const hasNode = selected.some((c) => c?.isNode?.());
            if (!hasNode) return;
            const edges = selected.filter((c) => c?.isEdge?.());
            if (!edges.length) return;
            graph.unselect(edges);
        };

        const onCellContextMenu = ({ cell, e }: any) => {
            if (!cell || !e) return;
            if (!cell.isNode?.() && !cell.isEdge?.()) return;
            e.preventDefault();
            const additive = e?.shiftKey || e?.ctrlKey || e?.metaKey;
            if (graph.isSelected(cell)) {
                // keep current multi-selection
            } else if (additive) {
                if (!graph.isSelected(cell)) graph.select(cell);
            } else {
                graph.resetSelection(cell);
            }
            bumpSelection();
            enforceNodePriority();
            openContextMenuAt(e.clientX, e.clientY, cell.isNode?.() ? "node" : "edge");
        };

        const onBlankContextMenu = ({ e }: any) => {
            e?.preventDefault?.();
            setMenuTarget("blank");
            bumpSelection();
            closeContextMenu();
        };

        const onKeyDown = (e: KeyboardEvent) => {
            if (shouldIgnoreKey(e)) return;
            if (e.key !== "Delete" && e.key !== "Backspace") return;
            const selected = graph.getSelectedCells?.() ?? [];
            if (!selected.length) return;
            e.preventDefault();
            graph.removeCells(selected);
        };

        const onEdgeSelected = ({ edge }: any) => {
            addEdgeSelectedClass(edge);
        };

        const onEdgeUnselected = ({ edge }: any) => {
            removeEdgeSelectedClass(edge);
        };

        const onSelectionChanged = () => {
            enforceNodePriority();
            bumpSelection();
        };

        graph.on("cell:selected", bumpSelection);
        graph.on("cell:unselected", bumpSelection);
        graph.on("edge:selected", onEdgeSelected);
        graph.on("edge:unselected", onEdgeUnselected);
        graph.on("selection:changed", onSelectionChanged);
        graph.on("cell:contextmenu", onCellContextMenu);
        graph.on("blank:contextmenu", onBlankContextMenu);
        window.addEventListener("keydown", onKeyDown);

        onCleanup(() => {
            graph.off("cell:selected", bumpSelection);
            graph.off("cell:unselected", bumpSelection);
            graph.off("edge:selected", onEdgeSelected);
            graph.off("edge:unselected", onEdgeUnselected);
            graph.off("selection:changed", onSelectionChanged);
            graph.off("cell:contextmenu", onCellContextMenu);
            graph.off("blank:contextmenu", onBlankContextMenu);
            window.removeEventListener("keydown", onKeyDown);
        });
    });

    return (
        <div class="w-full h-full relative">
            <WorkspaceToolbar
                simulation={{
                    running: simulationState().running,
                    busy: simulationState().busy,
                    mode: simulationState().mode,
                    disabled: !ScopeCtx.activeScopeId(),
                    onToggleRunning: () => {
                        if (!simulationManager) return;
                        if (simulationState().running) simulationManager.pause();
                        else simulationManager.resume();
                    },
                    onNextTick: () => {
                        void simulationManager?.nextTick();
                    },
                    onModeChange: (mode) => {
                        simulationManager?.setMode(mode);
                    },
                }}
            />
            <Show when={ScopeCtx.activeScopeId()} fallback={<p>Create a new tab</p>}>
                <div ref={UIEngine.setContainer} class="w-full h-full"></div>
                <ContextMenuRoot
                    fitViewport
                    overflowPadding={8}
                    placement="bottom-start"
                    modal={false}
                    open={menuOpen()}
                    onOpenChange={(open) => {
                        setMenuOpen(open);
                        if (!open) {
                            setMenuTarget("blank");
                            setMenuPoint(null);
                        }
                    }}
                >
                    <ContextMenuAnchorBridge
                        onReady={(setter) => {
                            setAnchorRect = setter;
                            const point = menuPoint();
                            if (point) setAnchorRect?.(point);
                        }}
                    />
                    <ContextMenu.Portal>
                        <ContextMenu.Content
                            class={styles.content()}
                            onPointerDownOutside={() => closeContextMenu()}
                            onInteractOutside={() => closeContextMenu()}
                            onClick={() => closeContextMenu()}
                        >
                            <ContextMenu.Item
                                class={styles.item()}
                                disabled={getSelectionCount() === 0 || menuTarget() === "blank"}
                                closeOnSelect
                                onSelect={removeSelected}
                            >
                                <span class={styles.itemLabel()}>Remove selected</span>
                                <span class={styles.itemShortcut()}>Del</span>
                            </ContextMenu.Item>
                        </ContextMenu.Content>
                    </ContextMenu.Portal>
                </ContextMenuRoot>
            </Show>
        </div>
    );
};

export const Workspace: Component = () => {
    return <InnerWorkspace />;
};
