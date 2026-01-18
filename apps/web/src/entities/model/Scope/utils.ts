import { ScopePath } from "./types";

export const getParentFromPath = (path: ScopePath = []) => path.at(-1);

export const getPathToScope = ({ id, path = [] }: { id: string; path?: ScopePath }): ScopePath => [
    ...path,
    id,
];
