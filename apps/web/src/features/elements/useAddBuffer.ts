import { useLogicEngine } from "@gately/shared/infrastructure/LogicEngine";
import { useScopeContext } from "@gately/entities/model/Scope/ScopeProvider";
import { mapItemToNode } from "@gately/shared/infrastructure/UIEngine";
import { useUIEngine } from "@gately/shared/infrastructure";
import { ItemBuilderResult } from "@cnbn/engine";

export const useAddBuffer = () => {
    const logicEngine = useLogicEngine();
    const scopeCtx = useScopeContext();
    const uiEngine = useUIEngine();

    const addBuffer = async () => {
        const tabId = scopeCtx.activeScopeId();
        if (!tabId) return;

        const result = (await logicEngine.call("/item/create", {
            kind: "base:logic",
            hash: "BUFFER",
            path: [tabId],
        })) as ItemBuilderResult;
        console.log(result);
        const node = mapItemToNode(result);
        console.log(node);
        uiEngine.addNode(node);

        return result;
    };

    return { addBuffer };
};
