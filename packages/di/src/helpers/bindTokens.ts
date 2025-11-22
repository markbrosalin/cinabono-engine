import { isDiToken } from "@di/helpers";
import { BindTokensToInstances, DiResolve, DiToken, DiTokenTree } from "@di/types";

export function bindTokensToInstances<T extends DiTokenTree, R = BindTokensToInstances<T>>(
    tree: T,
    resolve: DiResolve
): R {
    return new Proxy(tree, {
        get(target, key: string) {
            const node = Reflect.get(target, key) as DiToken | T;
            if (!node) return undefined;

            // nested layer
            if (!isDiToken(node)) {
                return bindTokensToInstances(node, resolve);
            } else {
                // token
                return resolve(node);
            }
        },

        has(target, p) {
            return Reflect.has(target, p);
        },
    }) as unknown as R;
}
