import type { Node } from "@antv/x6";
import type { LogicValue } from "@cnbn/schema";
import type { VisualBinding } from "../../model/visual";
import type { PinSide } from "../../model/types";

export type RegisterVisualPresetOptions = {
    replace?: boolean;
};

export type ReadSignals = (node: Node, side: PinSide) => Record<string, LogicValue | undefined>;

export type VisualExecutorContract<TState extends string = string> = {
    mount: (node: Node) => TState;
    update: (node: Node) => TState;
    unmount: (node: Node) => void;
    getState: (node: Node) => TState | undefined;
};

export type AnyVisualExecutor = VisualExecutorContract<string>;

export type VisualServiceContract = {
    usePresets: <TState extends string>(
        presets: VisualBinding<TState>[],
        options?: RegisterVisualPresetOptions,
    ) => string[];
    getPreset: <TState extends string = string>(hash: string) => VisualBinding<TState> | undefined;
    removePreset: (hash: string) => boolean;
    listPresetKeys: () => string[];
    mountNode: (node: Node) => string | undefined;
    updateNode: (node: Node) => string | undefined;
    unmountNode: (node: Node) => void;
    updateByNodeId: (nodeId: string) => string | undefined;
};
