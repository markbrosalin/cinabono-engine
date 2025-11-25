import { isDiToken } from "../helpers";
export function bindTokensToInstances(tree, resolve) {
    return new Proxy(tree, {
        get(target, key) {
            const node = Reflect.get(target, key);
            if (!node)
                return undefined;
            // nested layer
            if (!isDiToken(node)) {
                return bindTokensToInstances(node, resolve);
            }
            else {
                // token
                return resolve(node);
            }
        },
        has(target, p) {
            return Reflect.has(target, p);
        },
    });
}
