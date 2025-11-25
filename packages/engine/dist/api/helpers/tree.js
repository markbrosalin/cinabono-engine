/**
 * @returns array of parts without empty strings
 * @example /math//add => ['math','add']
 */
export function getPartsOfPath(path) {
    return path.split("/").filter(Boolean);
}
/**
 * @returns value from the object according to the path
 */
export function getByPath(root, path) {
    return getPartsOfPath(path).reduce((acc, key) => acc?.[key], root);
}
/**
 * Creates nested objects along the path /.../...
 * and assigns a value to the last
 */
export function assignByPath(root, path, value) {
    const parts = getPartsOfPath(path);
    let node = root;
    for (let i = 0; i < parts.length - 1; i++) {
        const key = parts[i];
        if (!node[key])
            node[key] = {};
        node = node[key];
    }
    node[parts[parts.length - 1]] = value;
}
/**
 *  Checks if root has nested objects by path
 */
export function hasPath(root, path) {
    const parts = path.split("/").filter(Boolean);
    let node = root;
    for (const key of parts) {
        if (!node || typeof node !== "object" || !(key in node))
            return false;
        node = node[key];
    }
    return true;
}
