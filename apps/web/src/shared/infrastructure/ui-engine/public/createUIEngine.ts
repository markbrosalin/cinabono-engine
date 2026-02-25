import { Graph } from "@antv/x6";
import { registerPresets } from "../presets-registry";
import { makeGraphOptions } from "../graph-options/graphOptions";
import { plugins } from "../plugins";
import { buildServices } from "../services";
import type { UIEngineContext, UIEngineExternalContext } from "../model/types";

export const createUIEngine = (
    container: HTMLDivElement,
    externalCtx: UIEngineExternalContext = {},
) => {
    registerPresets();

    const engineCtx: UIEngineContext = { ...externalCtx } as UIEngineContext;
    const graph = new Graph(makeGraphOptions(container, engineCtx));
    const services = buildServices(graph, engineCtx);

    const disposers: Array<() => void> = [];
    for (const plugin of plugins) {
        const dispose = plugin.apply(graph, engineCtx);
        if (typeof dispose === "function") disposers.push(dispose);
    }

    const dispose = () => {
        disposers.reverse().forEach((fn) => {
            try {
                fn();
            } catch (err) {
                console.error(`[UIEngine] plugin dispose failed`, err);
            }
        });
        graph.dispose();
    };

    return { graph, services, dispose };
};
