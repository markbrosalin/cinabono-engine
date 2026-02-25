import type { Node } from "@antv/x6";
import type { CellAttrs } from "@antv/x6/lib/registry/attr";
import type { MarkupJSONMarkup } from "@antv/x6/lib/view/markup";
import type { LogicValue } from "@cnbn/schema";
import type { PinSide } from "../types";
import type { NodeHashes } from "../nodes-spec/types";

export type VisualPatch = {
    attrs?: CellAttrs;
    markup?: MarkupJSONMarkup[];
    class?: Record<
        string,
        {
            add?: string[];
            remove?: string[];
        }
    >;
};

export type VisualPreset<TState extends string = string> = {
    hash: NodeHashes | string;
    nodeName: string;
    minWidth: number;
    minHeight: number;
    base?: VisualPatch;
    states: Record<TState, VisualPatch>;
};

export type VisualResolverContext<TState extends string = string> = {
    node: Node;
    spec: VisualPreset<TState>;
    currentState?: TState;
    readSignals: (side: PinSide) => Record<string, LogicValue | undefined>;
};

export type VisualStateResolver<TState extends string = string> = (
    ctx: VisualResolverContext<TState>,
) => TState;

export type VisualBinding<TState extends string = string> = {
    preset: VisualPreset<TState>;
    resolveState: VisualStateResolver<TState>;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyVisualBinding = VisualBinding<any>;
