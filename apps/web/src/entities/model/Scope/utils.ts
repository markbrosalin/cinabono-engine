import type { ScopeModel, ScopePath } from "./types";

export const getParentFromPath = (path: ScopePath = []) => path.at(-1);

export const getPathToScope = ({ id, path = [] }: { id: string; path?: ScopePath }): ScopePath => [
    ...path,
    id,
];

export const getTabFromPath = (path: ScopePath = []) => path[0];

export const resolveTabIdByActiveScope = (
    activeScopeId: string | undefined,
    getScopeById: (id: string) => ScopeModel | undefined,
): string | undefined => {
    if (!activeScopeId) return;

    const scope = getScopeById(activeScopeId);
    if (!scope) return activeScopeId;
    if (scope.kind === "tab") return scope.id;

    const tabId = getTabFromPath(scope.path);
    return tabId || scope.id;
};
