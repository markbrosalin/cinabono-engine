import { useLogicEngine } from "@gately/shared/infrastructure/LogicEngine";
import { useScopeContext } from "@gately/entities/model/Scope/ScopeProvider";
import { mapItemToNode } from "@gately/shared/infrastructure/UIEngine";
import { BaseLogicHash, useUIEngine } from "@gately/shared/infrastructure";
import { ItemBuilderResult } from "@cnbn/engine";

export const useAddBaseLogic = () => {
    const logicEngine = useLogicEngine();
    const scopeCtx = useScopeContext();
    const uiEngine = useUIEngine();

    const addLogicElement = async (hash: BaseLogicHash) => {
        const scopeId = scopeCtx.activeScopeId();
        if (!scopeId) return;

        const scope = scopeCtx.getScope(scopeId);
        if (!scope) return;

        const result = (await logicEngine.call("/item/create", {
            kind: "base:logic",
            hash,
            path: [...scope.path, scope.id],
        })) as ItemBuilderResult;

        const node = mapItemToNode(result);
        uiEngine.addNode(node);

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
