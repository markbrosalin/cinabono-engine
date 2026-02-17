import type { Graph, Node } from "@antv/x6";
import { decodePortId } from "@gately/shared/infrastructure/ui-engine/lib";
import { isObject } from "@gately/shared/lib/object";
import type { SimulationSnapshot } from "./contracts";

export type DebugLogRow = {
    t: number;
    type: string;
    data?: Record<string, unknown>;
};

type InternalsSnapshot = {
    loopActive: boolean;
    loopQueued: boolean;
    generation: number;
    hasDirtyTimer: boolean;
    hasTimeoutWait: boolean;
    hasRafWait: boolean;
};

type InstallDebugToolsOptions = {
    graph: Graph;
    getSnapshot: () => SimulationSnapshot;
    getActiveTabId: () => string | undefined;
    getInternals: () => InternalsSnapshot;
};

type DebugWindow = Window & {
    __SIM_DEBUG__?: boolean;
    __SIM_DEBUG_LOGS__?: DebugLogRow[];
    __SIM_DUMP_STATE__?: () => unknown;
    __SIM_CLEAR_LOGS__?: () => void;
};

const MAX_LOG_ROWS = 500;

const readLogicClass = (className: string): string => {
    const token = className.split(/\s+/).find((cls) => cls.startsWith("value-"));
    return token ?? "value-x";
};

const toLogicValue = (logicClass: string): string => {
    switch (logicClass) {
        case "value-true":
            return "1";
        case "value-false":
            return "0";
        case "value-hiz":
            return "Z";
        default:
            return "X";
    }
};

const readNode = (node: Node) => {
    const data = node.getData?.();
    const hash = isObject(data) && typeof data.hash === "string" ? data.hash : undefined;
    const ports = (node.getPorts?.() ?? []).flatMap((port) => {
        if (!port?.id || typeof port.id !== "string") return [];
        const className = node.getPortProp<string>(port.id, "attrs/circle/class") ?? "";
        const logicClass = readLogicClass(className);
        const { side, id } = decodePortId(port.id);
        return [
            {
                portId: port.id,
                side,
                pin: id,
                className,
                logicClass,
                value: toLogicValue(logicClass),
            },
        ];
    });

    return {
        id: node.id,
        hash,
        ports,
    };
};

const readGraphSignals = (graph: Graph) => {
    const nodes = graph.getNodes?.() ?? [];
    return nodes.map(readNode);
};

export const trace = (type: string, data?: Record<string, unknown>) => {
    if (typeof window === "undefined") return;
    const w = window as DebugWindow;
    if (!w.__SIM_DEBUG__) return;

    const logs = (w.__SIM_DEBUG_LOGS__ ??= []);
    const t = typeof performance === "undefined" ? Date.now() : performance.now();
    logs.push({ t, type, data });
    if (logs.length > MAX_LOG_ROWS) logs.shift();
};

export const installDebugTools = (opts: InstallDebugToolsOptions): (() => void) => {
    if (typeof window === "undefined") return () => void 0;
    const { graph, getSnapshot, getActiveTabId, getInternals } = opts;
    const w = window as DebugWindow;

    const dumpState = () => ({
        snapshot: getSnapshot(),
        activeTabId: getActiveTabId(),
        internals: getInternals(),
        nodes: readGraphSignals(graph),
        logs: [...(w.__SIM_DEBUG_LOGS__ ?? [])],
    });
    const clearLogs = () => {
        w.__SIM_DEBUG_LOGS__ = [];
    };

    w.__SIM_DUMP_STATE__ = dumpState;
    w.__SIM_CLEAR_LOGS__ = clearLogs;

    return () => {
        if (w.__SIM_DUMP_STATE__ === dumpState) delete w.__SIM_DUMP_STATE__;
        if (w.__SIM_CLEAR_LOGS__ === clearLogs) delete w.__SIM_CLEAR_LOGS__;
    };
};
