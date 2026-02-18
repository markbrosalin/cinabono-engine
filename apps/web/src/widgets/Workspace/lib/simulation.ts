import type { CinabonoClient } from "@cnbn/engine-worker";
import type { ScopeModel } from "@gately/entities/model/Scope/types";
import { resolveTabIdByActiveScope } from "@gately/entities/model/Scope/utils";
import { nowInMs, waitForFrame, waitForRemainingInterval } from "@gately/shared/lib/wait";
import { createSignal } from "solid-js";
import type { WorkspaceSimulationController, WorkspaceSimulationMode } from "./types";

type WorkspaceSimulationOptions = {
    logicEngine: CinabonoClient;
    getActiveScopeId: () => string | undefined;
    getScopeById: (id: string) => ScopeModel | undefined;
};

const HALF_SECOND_MS = 500;

export const createWorkspaceSimulation = (
    opts: WorkspaceSimulationOptions,
): WorkspaceSimulationController => {
    const [mode, setMode] = createSignal<WorkspaceSimulationMode>("instant");
    const [paused, setPaused] = createSignal(false);
    const [busy, setBusy] = createSignal(false);

    let disposed = false;
    let runningLoop = false;

    const getActiveTabId = (): string | undefined => {
        return resolveTabIdByActiveScope(opts.getActiveScopeId(), opts.getScopeById);
    };

    const runLoop = async (singleTick: boolean): Promise<void> => {
        if (disposed || runningLoop) return;

        runningLoop = true;
        setBusy(true);

        try {
            while (!disposed) {
                if (!singleTick && paused()) break;

                const tabId = getActiveTabId();
                if (!tabId) break;

                const statusRes = await opts.logicEngine.call("/simulation/status", { tabId });
                if (statusRes.status?.isFinished) break;

                const runMode = mode();
                const maxBatchTicks = singleTick ? 1 : runMode === "instant" ? 64 : 1;
                const startedAt = nowInMs();

                const simulateRes = await opts.logicEngine.call("/simulation/simulate", {
                    tabId,
                    runCfg: { maxBatchTicks },
                });

                console.log("[workspace-simulation] simulate result", {
                    tabId,
                    mode: runMode,
                    maxBatchTicks,
                    tickEvents: simulateRes.tickEvents,
                });

                if (singleTick) break;

                if (runMode === "0.5sec") {
                    await waitForRemainingInterval(startedAt, HALF_SECOND_MS);
                } else {
                    await waitForFrame();
                }
            }
        } catch (err) {
            console.error("[workspace-simulation] loop failed", err);
        } finally {
            runningLoop = false;
            setBusy(false);
        }
    };

    const requestNow = () => {
        if (disposed || paused() || runningLoop) return;
        void runLoop(false);
    };

    const run = () => {
        if (disposed) return;
        setPaused(false);
        requestNow();
    };

    const pause = () => {
        if (disposed) return;
        setPaused(true);
    };

    const resume = () => {
        run();
    };

    const nextStep = () => {
        if (disposed || runningLoop) return;
        void runLoop(true);
    };

    const dispose = () => {
        disposed = true;
        setPaused(true);
    };

    return {
        get isPaused() {
            return paused();
        },
        get isBusy() {
            return busy();
        },
        get mode() {
            return mode();
        },
        set mode(nextMode: WorkspaceSimulationMode) {
            setMode(nextMode);
            requestNow();
        },
        get isDisabled() {
            return !getActiveTabId();
        },
        nextStep,
        requestNow,
        run,
        pause,
        resume,
        dispose,
    };
};
