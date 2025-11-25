import { makeScopeRegistry } from "./scope.registry";
export const openScopeOperations = (flow) => {
    const registry = makeScopeRegistry(flow);
    return {
        reg: {
            itemToScope: registry.item.reg,
            scopeToScope: registry.scope.reg,
            linkToScope: registry.link.reg,
        },
        unreg: {
            itemFromScope: registry.item.unreg,
            scopeFromScope: registry.scope.unreg,
            linkFromScope: registry.link.unreg,
        },
    };
};
