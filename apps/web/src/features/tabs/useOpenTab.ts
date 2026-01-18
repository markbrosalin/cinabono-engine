import { useScopeContext } from "@gately/entities/model/Scope/ScopeProvider";

export const useOpenTab = () => {
    const scopeCtx = useScopeContext();

    const openTab = (tabId: string, conditions?: { isActive?: boolean }) => {
        if (conditions?.isActive === true) return;
        scopeCtx.setActiveScope(tabId);
    };

    return { openTab };
};
