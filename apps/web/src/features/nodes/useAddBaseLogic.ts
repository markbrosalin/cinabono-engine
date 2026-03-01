import { useScopeContext } from "@gately/entities/model/Scope/ScopeProvider";
import { NodeHashes } from "@gately/shared/infrastructure/ui-engine/model";
import { useUIEngine } from "@gately/shared/infrastructure/ui-engine/public";

export const useAddLogicNode = () => {
    const scopeCtx = useScopeContext();
    const uiEngine = useUIEngine();

    const addLogicElement = async (hash: NodeHashes) => {
        const scopeId = scopeCtx.activeScopeId();
        if (!scopeId) return;
        if (!uiEngine.state.ready()) return;

        const scope = scopeCtx.getScope(scopeId);
        if (!scope) return;

        return uiEngine.commands.addNode({
            hash,
            scopeId: scope.id,
            scopePath: scope.path,
        });
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
