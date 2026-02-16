import { useLogicEngine } from "@gately/shared/infrastructure/LogicEngine";
import { useScopeContext } from "@gately/entities/model/Scope/ScopeProvider";
import { ItemBuilderResult } from "@cnbn/engine";
import { NodeHashes } from "@gately/shared/infrastructure/ui-engine/model";
import { useUIEngine } from "@gately/shared/infrastructure/ui-engine/public";

type NodeKind = "base:logic" | "base:generator" | "base:display";

const NODE_KIND_BY_HASH: Record<NodeHashes, NodeKind> = {
    BUFFER: "base:logic",
    AND: "base:logic",
    OR: "base:logic",
    NOT: "base:logic",
    NAND: "base:logic",
    NOR: "base:logic",
    XOR: "base:logic",
    XNOR: "base:logic",
    TOGGLE: "base:generator",
    LAMP: "base:display",
};

export const useAddLogicNode = () => {
    const logicEngine = useLogicEngine();
    const scopeCtx = useScopeContext();
    const uiEngine = useUIEngine();

    const addLogicElement = async (hash: NodeHashes) => {
        const scopeId = scopeCtx.activeScopeId();
        if (!scopeId) return;

        const scope = scopeCtx.getScope(scopeId);
        if (!scope) return;

        const result = (await logicEngine.call("/item/create", {
            kind: NODE_KIND_BY_HASH[hash],
            hash,
            path: [...scope.path, scope.id],
        })) as ItemBuilderResult;

        uiEngine.services()?.nodes.createNode(result);

        return result;
    };

    return {
        addBuffer: () => addLogicElement("BUFFER"),
        addAnd: () => addLogicElement("AND"),
        addOr: () => addLogicElement("OR"),
        addNot: () => addLogicElement("NOT"),
        addNand: () => addLogicElement("NAND"),
        addNor: () => addLogicElement("NOR"),
        addXor: () => addLogicElement("XOR"),
        addXnor: () => addLogicElement("XNOR"),
        addToggle: () => addLogicElement("TOGGLE"),
        addLamp: () => addLogicElement("LAMP"),
    };
};
