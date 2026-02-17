import { EngineWorkerEvents } from "@cnbn/engine-worker";
import { getTabFromPath } from "@gately/entities/model/Scope/utils";
import { applyEngineEvents } from "@gately/shared/infrastructure/LogicEngine";
import { isObject } from "@gately/shared/lib/object";
import type {
    AttachWorkspaceSimulationManagerOptions,
    SimulationMode,
    SimulationSnapshot,
    WorkspaceSimulationManager,
} from "./contracts";
import { installDebugTools, trace } from "./debug";
import { getDelayMode } from "./modes";
import { createCancelableDelay } from "./scheduler";

const DIRTY_COMMANDS = new Set([
    "/item/link",
    "/item/unlink",
    "/item/remove",
    "/item/updateInput",
    "/item/updateOutput",
]);

const getPayloadTabId = (payload: unknown): string | undefined => {
    if (!isObject(payload)) return;
    const tabId = payload.tabId;
    return typeof tabId === "string" ? tabId : undefined;
};

const toFixedMs = (v: number) => +v.toFixed(2);

const compactStatus = (status: unknown): Record<string, unknown> | undefined => {
    if (!isObject(status)) return;

    const state = typeof status.state === "string" ? status.state : undefined;
    const now = typeof status.now === "number" ? status.now : undefined;
    const ticksExecuted =
        typeof status.ticksExecuted === "number" ? status.ticksExecuted : undefined;
    const eventsProcessed =
        typeof status.eventsProcessed === "number" ? status.eventsProcessed : undefined;
    const isFinished =
        typeof status.isFinished === "boolean" ? status.isFinished : undefined;

    return {
        state,
        now,
        ticksExecuted,
        eventsProcessed,
        isFinished,
    };
};

const isStatusFinished = (raw: unknown): boolean => {
    if (!isObject(raw)) return false;
    const status = raw.status;
    return isObject(status) && status.isFinished === true;
};

export const attachWorkspaceSimulationManager = (
    opts: AttachWorkspaceSimulationManagerOptions,
): WorkspaceSimulationManager => {
    const { graph, client, getActiveScopeId, getScopeById, applyPinUpdates } = opts;

    let disposed = false;
    let loopActive = false;
    let loopId = 0;
    let wakeResolve: (() => void) | undefined;
    let needsRun = true;

    let snapshot: SimulationSnapshot = {
        running: true,
        busy: false,
        mode: "framerate",
        dirty: true,
    };

    const listeners = new Set<(state: SimulationSnapshot) => void>();
    const delay = createCancelableDelay();

    const notify = () => {
        for (const listener of listeners) listener(snapshot);
    };

    const patch = (next: Partial<SimulationSnapshot>) => {
        const prev = snapshot;
        const merged = { ...prev, ...next };
        const changed =
            merged.running !== prev.running ||
            merged.busy !== prev.busy ||
            merged.mode !== prev.mode ||
            merged.dirty !== prev.dirty;

        snapshot = merged;
        if (changed) notify();
    };

    const wakeLoop = () => {
        const resolve = wakeResolve;
        wakeResolve = undefined;
        resolve?.();
    };

    const waitUntilWake = async () => {
        if (disposed) return;
        if (snapshot.running && needsRun) return;

        await new Promise<void>((resolve) => {
            if (disposed || (snapshot.running && needsRun)) {
                resolve();
                return;
            }

            wakeResolve = () => {
                wakeResolve = undefined;
                resolve();
            };
        });
    };

    const getActiveTabId = (): string | undefined => {
        const activeId = getActiveScopeId();
        if (!activeId) return;

        const scope = getScopeById(activeId);
        if (!scope) return activeId;

        if (scope.kind === "tab") return scope.id;
        const tabId = getTabFromPath(scope.path);
        return tabId || scope.id;
    };

    const applyBatch = (raw: unknown) => {
        applyEngineEvents({ applyPinUpdates, graph }, raw);
    };

    const markDirty = () => {
        if (disposed) return;
        needsRun = true;
        patch({ dirty: true });
        delay.cancel();
        wakeLoop();
        trace("dirty.mark", { running: snapshot.running, busy: snapshot.busy });
    };

    const setMode = (mode: SimulationMode) => {
        if (snapshot.mode === mode) return;
        patch({ mode });
        markDirty();
    };

    const pause = () => {
        if (!snapshot.running) return;
        patch({ running: false });
        delay.cancel();
        wakeLoop();
    };

    const resume = () => {
        if (snapshot.running) return;
        patch({ running: true });
        markDirty();
    };

    const nextTick = async () => {
        if (disposed || snapshot.running || snapshot.busy) return;

        const tabId = getActiveTabId();
        if (!tabId) return;

        patch({ busy: true, dirty: false });
        try {
            const simRes = await client.call("/simulation/simulate", {
                tabId,
                runCfg: { maxBatchTicks: 1 },
            });
            if (disposed || snapshot.running) return;
            if (getActiveTabId() !== tabId) return;
            applyBatch(simRes);
        } catch {
            void 0;
        } finally {
            patch({ busy: false, dirty: needsRun });
        }
    };

    const runLoop = async () => {
        if (loopActive || disposed) return;

        loopActive = true;
        const currentLoopId = ++loopId;
        trace("loop.start", {
            loopId: currentLoopId,
            mode: snapshot.mode,
            running: snapshot.running,
            dirty: snapshot.dirty,
        });

        try {
            while (!disposed) {
                if (!snapshot.running || !needsRun) {
                    await waitUntilWake();
                    continue;
                }

                const tabId = getActiveTabId();
                if (!tabId) {
                    needsRun = false;
                    patch({ dirty: false });
                    await waitUntilWake();
                    continue;
                }

                const tickStartedAt = performance.now();
                let statusMs = 0;
                let simulateMs = 0;
                let applyMs = 0;
                let waitMs = 0;
                let statusRes: unknown;
                let didSimulate = false;

                needsRun = false;
                patch({ busy: true, dirty: false });

                try {
                    const statusStartedAt = performance.now();
                    statusRes = await client.call("/simulation/status", { tabId });
                    statusMs = performance.now() - statusStartedAt;

                    if (disposed || !snapshot.running) continue;
                    if (getActiveTabId() !== tabId) {
                        needsRun = true;
                        patch({ dirty: true });
                        continue;
                    }

                    if (isStatusFinished(statusRes)) {
                        trace("loop.stop", {
                            loopId: currentLoopId,
                            reason: "finished",
                            tabId,
                            status: compactStatus(isObject(statusRes) ? statusRes.status : undefined),
                        });
                        continue;
                    }

                    const simulateStartedAt = performance.now();
                    const simRes = await client.call("/simulation/simulate", {
                        tabId,
                        runCfg: { maxBatchTicks: 1 },
                    });
                    simulateMs = performance.now() - simulateStartedAt;

                    if (disposed || !snapshot.running) continue;
                    if (getActiveTabId() !== tabId) {
                        needsRun = true;
                        patch({ dirty: true });
                        continue;
                    }

                    const applyStartedAt = performance.now();
                    applyBatch(simRes);
                    applyMs = performance.now() - applyStartedAt;
                    didSimulate = true;
                } catch (err) {
                    trace("loop.error", {
                        loopId: currentLoopId,
                        message: err instanceof Error ? err.message : "unknown",
                    });
                } finally {
                    patch({ busy: false, dirty: needsRun });
                }

                if (disposed || !snapshot.running || !didSimulate) continue;

                needsRun = true;
                patch({ dirty: true });

                const delayMode = getDelayMode(snapshot.mode);
                const waitStartedAt = performance.now();
                await delay.wait(delayMode);
                waitMs = performance.now() - waitStartedAt;

                trace("tick", {
                    loopId: currentLoopId,
                    tabId,
                    mode: snapshot.mode,
                    requestedDelay: delayMode,
                    status: compactStatus(isObject(statusRes) ? statusRes.status : undefined),
                    statusMs: toFixedMs(statusMs),
                    simulateMs: toFixedMs(simulateMs),
                    applyMs: toFixedMs(applyMs),
                    waitMs: toFixedMs(waitMs),
                    totalMs: toFixedMs(performance.now() - tickStartedAt),
                });
            }
        } finally {
            loopActive = false;
            patch({ busy: false });
            trace("loop.finish", {
                loopId: currentLoopId,
                running: snapshot.running,
                dirty: snapshot.dirty,
                needsRun,
            });
        }
    };

    const detachDebugTools = installDebugTools({
        graph,
        getSnapshot: () => snapshot,
        getActiveTabId,
        getInternals: () => {
            const waitState = delay.getState();
            return {
                loopActive,
                loopQueued: needsRun && snapshot.running,
                generation: 0,
                hasDirtyTimer: false,
                hasTimeoutWait: waitState.hasTimeoutWait,
                hasRafWait: waitState.hasRafWait,
            };
        },
    });

    const offRpc = client.bus.on(EngineWorkerEvents.workerEngine.rpc.finish, ({ payload }) => {
        const command = payload?.request?.command;
        if (!command || !DIRTY_COMMANDS.has(command)) return;

        const payloadTabId = getPayloadTabId(payload?.request?.payload);
        const activeTabId = getActiveTabId();
        if (payloadTabId && activeTabId && payloadTabId !== activeTabId) return;

        trace("rpc.finish", { command, payloadTabId });
        markDirty();
    });

    void runLoop();

    const dispose = () => {
        if (disposed) return;
        disposed = true;
        delay.cancel();
        wakeLoop();
        offRpc?.();
        detachDebugTools();
        listeners.clear();
    };

    return {
        getSnapshot: () => snapshot,
        subscribe: (listener) => {
            listeners.add(listener);
            listener(snapshot);
            return () => listeners.delete(listener);
        },
        markDirty,
        setMode,
        pause,
        resume,
        nextTick,
        dispose,
    };
};
