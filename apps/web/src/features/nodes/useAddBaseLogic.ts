import { useLogicEngine } from "@gately/shared/infrastructure/LogicEngine";
import { useScopeContext } from "@gately/entities/model/Scope/ScopeProvider";
import { ItemBuilderResult } from "@cnbn/engine";
import { LogicNodeHashes } from "@gately/shared/infrastructure/ui-engine/model";
import { useUIEngine } from "@gately/shared/infrastructure/ui-engine/public";

export const useAddLogicNode = () => {
    const logicEngine = useLogicEngine();
    const scopeCtx = useScopeContext();
    const uiEngine = useUIEngine();

    const addLogicElement = async (hash: LogicNodeHashes) => {
        const scopeId = scopeCtx.activeScopeId();
        if (!scopeId) return;

        const scope = scopeCtx.getScope(scopeId);
        if (!scope) return;

        const result = (await logicEngine.call("/item/create", {
            kind: "base:logic",
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
    };
};
