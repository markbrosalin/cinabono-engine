import type { Node } from "@antv/x6";
import type { VisualBinding, VisualPatch } from "../../model/visual";
import { mergeAttrs } from "./lib/attrs";
import type { ReadSignals, VisualExecutorContract } from "./types";

const VISUAL_BATCH_NAME = "update";

const pickMarkup = (base?: VisualPatch["markup"], patch?: VisualPatch["markup"]) => {
    return patch ?? base;
};

const mergeUnique = (left?: string[], right?: string[]): string[] | undefined => {
    const tokens = [...(left ?? []), ...(right ?? [])].filter(Boolean);
    if (!tokens.length) return;
    return Array.from(new Set(tokens));
};

const mergeClassPatch = (base?: VisualPatch["class"], patch?: VisualPatch["class"]) => {
    if (!base && !patch) return;
    if (!base) return patch;
    if (!patch) return base;

    const next: NonNullable<VisualPatch["class"]> = { ...base };
    for (const [selector, rule] of Object.entries(patch)) {
        next[selector] = {
            add: mergeUnique(base[selector]?.add, rule?.add),
            remove: mergeUnique(base[selector]?.remove, rule?.remove),
        };
    }

    return next;
};

const applyClassPatch = (node: Node, patch?: VisualPatch["class"]): void => {
    if (!patch) return;

    for (const [selector, rule] of Object.entries(patch)) {
        const currentRaw = node.getAttrByPath(`${selector}/class`);
        const current = typeof currentRaw === "string" ? currentRaw : "";
        const tokens = new Set(current.split(/\s+/).filter(Boolean));

        for (const token of rule.remove ?? []) {
            tokens.delete(token);
        }
        for (const token of rule.add ?? []) {
            tokens.add(token);
        }

        const next = Array.from(tokens).join(" ").trim();
        node.setAttrByPath(`${selector}/class`, next);
    }
};

export const createVisualExecutor = <TState extends string>(
    binding: VisualBinding<TState>,
    readSignals: ReadSignals,
): VisualExecutorContract<TState> => {
    const stateMap = new WeakMap<Node, TState>();

    const _runInBatch = (node: Node, run: () => void): void => {
        node.startBatch(VISUAL_BATCH_NAME);
        try {
            run();
        } finally {
            node.stopBatch(VISUAL_BATCH_NAME);
        }
    };

    const _applyPatch = (node: Node, patch: VisualPatch): void => {
        if (patch.attrs) {
            node.setAttrs(patch.attrs);
        }
        if (patch.markup) {
            node.setMarkup(patch.markup);
        }
        if (patch.class) {
            applyClassPatch(node, patch.class);
        }
    };

    const _applyState = (node: Node, state: TState): void => {
        const base = binding.preset.base ?? {};
        const variant = binding.preset.states[state] ?? {};
        const merged: VisualPatch = {
            attrs: mergeAttrs(base.attrs, variant.attrs),
            markup: pickMarkup(base.markup, variant.markup),
            class: mergeClassPatch(base.class, variant.class),
        };

        _runInBatch(node, () => {
            _applyPatch(node, merged);
        });

        stateMap.set(node, state);
    };

    const update = (node: Node): TState => {
        const prev = stateMap.get(node);
        const next = binding.resolveState({
            node,
            spec: binding.preset,
            currentState: prev,
            readSignals: (side) => readSignals(node, side),
        });

        if (prev !== next) {
            _applyState(node, next);
        }

        return next;
    };

    return {
        mount: (node: Node) => update(node),
        update,
        unmount: (node: Node) => {
            stateMap.delete(node);
        },
        getState: (node: Node) => stateMap.get(node),
    };
};
