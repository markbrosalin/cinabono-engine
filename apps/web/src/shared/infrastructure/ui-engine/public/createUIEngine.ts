import { Graph } from "@antv/x6";
import { registerPresets } from "../presets-registry";
import { makeGraphOptions } from "../graph-options/graphOptions";
import { plugins } from "../plugins";
import { buildServices } from "../services";
import { UIEngineContext } from "../model/types";

export const createUIEngine = (container: HTMLDivElement, ctx: UIEngineContext) => {
    registerPresets();

    const graph = new Graph(makeGraphOptions(container));

    const disposers: Array<() => void> = [];
    for (const plugin of plugins) {
        const dispose = plugin.apply(graph, ctx);
        if (typeof dispose === "function") disposers.push(dispose);
    }

    const services = buildServices(graph, ctx);

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
