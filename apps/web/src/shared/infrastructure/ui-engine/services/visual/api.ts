import { Graph, type Node } from "@antv/x6";
import type { CellAttrs } from "@antv/x6/lib/registry/attr";
import type { AnyVisualBinding, VisualBinding } from "../../model/visual";
import type { UIEngineContext } from "../../model/types";
import { NODE_INSET, STROKE_WIDTH } from "../../model/constants";
import { baseNodeMarkup, baseNodePorts } from "../../model/nodes-spec";
import { defaultVisualPresets } from "./default-nodes";
import { createVisualExecutor } from "./executor";
import { mergeAttrs } from "./lib/attrs";
import type {
    AnyVisualExecutor,
    RegisterVisualPresetOptions,
    VisualServiceContract,
} from "./types";

export const useVisualService = (_graph: Graph, ctx: UIEngineContext): VisualServiceContract => {
    const presetByHash = new Map<string, AnyVisualBinding>();
    const executorByHash = new Map<string, AnyVisualExecutor>();

    const registerNodeFromPreset = (binding: AnyVisualBinding): void => {
        const { preset } = binding;
        const defaultAttrs: CellAttrs = {
            body: {
                x: NODE_INSET,
                y: NODE_INSET,
                width: preset.minWidth,
                height: preset.minHeight,
                strokeWidth: STROKE_WIDTH,
            },
            icon: {
                ref: "body",
                refX: "50%",
                refY: "50%",
            },
        };

        Graph.registerNode(
            preset.nodeName,
            {
                markup: preset.base?.markup ?? baseNodeMarkup,
                attrs: mergeAttrs(defaultAttrs, preset.base?.attrs),
                ports: baseNodePorts,
                width: preset.minWidth,
                height: preset.minHeight,
            },
            true,
        );
    };

    const getExecutorByHash = (hash: string): AnyVisualExecutor | undefined => {
        const existing = executorByHash.get(hash);
        if (existing) return existing;

        const binding = presetByHash.get(hash);
        if (!binding) return;

        const readSignals = ctx.getService("ports").readSignalsFromNode;

        const executor = createVisualExecutor(binding, readSignals);
        executorByHash.set(hash, executor);
        return executor;
    };

    const _usePreset = <TState extends string>(
        preset: VisualBinding<TState>,
        options: RegisterVisualPresetOptions = {},
    ): string => {
        const key = String(preset.preset.hash);
        const hasPreset = presetByHash.has(key);

        if (hasPreset && !options.replace) {
            throw new Error(`[UIEngine][visual] preset "${key}" is already registered`);
        }

        presetByHash.set(key, preset);
        executorByHash.delete(key);
        registerNodeFromPreset(preset);

        return key;
    };

    const usePresets = <TState extends string>(
        presets: VisualBinding<TState>[],
        options: RegisterVisualPresetOptions = {},
    ): string[] => {
        return presets.map((preset) => _usePreset(preset, options));
    };

    const getPreset = <TState extends string = string>(
        hash: string,
    ): VisualBinding<TState> | undefined => {
        return presetByHash.get(hash) as VisualBinding<TState> | undefined;
    };

    const removePreset = (hash: string): boolean => {
        const preset = presetByHash.get(hash);
        if (!preset) return false;

        presetByHash.delete(hash);
        executorByHash.delete(hash);
        return true;
    };

    const listPresetKeys = (): string[] => {
        return Array.from(presetByHash.keys());
    };

    const mountNode = (node: Node): string | undefined => {
        const hash = ctx.getService("nodes").getNodeHash(node);
        if (!hash) return;

        return getExecutorByHash(hash)?.mount(node);
    };

    const updateNode = (node: Node): string | undefined => {
        const hash = ctx.getService("nodes").getNodeHash(node);
        if (!hash) return;

        return getExecutorByHash(hash)?.update(node);
    };

    const unmountNode = (node: Node): void => {
        const hash = ctx.getService("nodes").getNodeHash(node);
        if (!hash) return;

        getExecutorByHash(hash)?.unmount(node);
    };

    const updateByNodeId = (nodeId: string): string | undefined => {
        const node = ctx.getService?.("nodes").getNode(nodeId);
        if (!node) return;

        return updateNode(node);
    };

    const init = (): void => {
        usePresets(defaultVisualPresets, { replace: true });
    };

    init();

    return {
        usePresets,
        getPreset,
        removePreset,
        listPresetKeys,
        mountNode,
        updateNode,
        unmountNode,
        updateByNodeId,
    };
};
