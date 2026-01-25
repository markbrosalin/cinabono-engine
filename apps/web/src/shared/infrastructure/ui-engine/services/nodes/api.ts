import type { Graph, Node } from "@antv/x6";
import type { UIEngineContext, UIEngineNodeData, UIEngineNodeProps } from "../../model/types";
import { buildNodeProps } from "./lib/propsBuilder";

export type NodeService = ReturnType<typeof useNodeService>;

export const useNodeService = (graph: Graph, _ctx: UIEngineContext) => {
    type CreateNodeArgs = Parameters<typeof buildNodeProps>;

    function createNode(props: UIEngineNodeProps): Node;
    function createNode(...args: CreateNodeArgs): Node;
    function createNode(
        arg0: UIEngineNodeProps | CreateNodeArgs[0],
        arg1?: CreateNodeArgs[1],
    ): Node {
        const props =
            (arg0 as { builtItem?: unknown })?.builtItem !== undefined
                ? buildNodeProps(arg0 as CreateNodeArgs[0], arg1 as CreateNodeArgs[1])
                : (arg0 as UIEngineNodeProps);

        return graph.addNode(props);
    }

    const removeNode = (nodeId: string): void => {
        graph.removeNode(nodeId);
    };

    const findNode = (nodeId: string): Node | undefined => {
        const cell = graph.getCellById(nodeId);
        if (!cell || !cell.isNode?.()) return;
        return cell as Node;
    };

    const updateNodeData = (nodeId: string, patch: Partial<UIEngineNodeData>): void => {
        const node = findNode(nodeId);
        if (!node) return;
        const data = (node.getData() ?? {}) as UIEngineNodeData;
        Object.assign(data, patch);
        node.setData(data);
    };

    return { createNode, removeNode, findNode, updateNodeData };
};
