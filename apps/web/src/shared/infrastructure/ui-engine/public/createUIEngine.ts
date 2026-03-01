import { Graph } from "@antv/x6";
import type { ItemBuilderResult } from "@cnbn/engine";
import { makeGraphOptions } from "../graph-options/graphOptions";
import { applyPlugins } from "../plugins";
import { buildServices } from "../services";
import { getNodeKindByHash } from "../model";
import type { UIEngineContext, UIEngineExternalContext } from "../model/types";
import type { UIEngineDebugApi, UIEngineRuntimeCommandApi } from "./types";

export const createUIEngine = (
    container: HTMLDivElement,
    externalCtx: UIEngineExternalContext = {},
) => {
    const engineCtx: UIEngineContext = { ...externalCtx } as UIEngineContext;
    const graph = new Graph(makeGraphOptions(container, engineCtx));
    const services = buildServices(graph, engineCtx);

    const getRequiredLogicEngine = () => {
        const logicEngine = engineCtx.logicEngine;
        if (!logicEngine) {
            throw new Error("[UIEngine] logic engine is not configured");
        }
        return logicEngine;
    };

    const commands: UIEngineRuntimeCommandApi = {
        async addNode(input) {
            const logicEngine = getRequiredLogicEngine();
            const result = (await logicEngine.call("/item/create", {
                kind: getNodeKindByHash(input.hash),
                hash: input.hash,
                path: [...input.scopePath, input.scopeId],
            })) as ItemBuilderResult;

            return services.nodes.createNode(result);
        },
        exportScopeSnapshot() {
            return services.snapshot.exportScopeSnapshot();
        },
        importScopeSnapshot(snapshot) {
            services.snapshot.importScopeSnapshot(snapshot);
        },
        applyPinPatch(patch) {
            services.signals.applyPinPatch(patch);
        },
        applySignalEvents(events) {
            services.signals.applyEvents(events);
        },
    };

    const debug: UIEngineDebugApi = {
        graph: () => graph,
    };

    const disposers = applyPlugins(graph, engineCtx);

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

    return { commands, debug, dispose };
};
