import { isApiCtor, isApiFunc } from "../../use-cases/api-registry/helpers";
export const buildApiFromTree = (executor, tree, prefix = "") => {
    const out = {};
    const walk = (node, pref) => {
        for (const key in node) {
            const child = node[key];
            const fullPath = (pref ? `${pref}.${key}` : key);
            if (isApiCtor(child) || isApiFunc(child)) {
                const path = fullPath;
                out[fullPath] = ((payload) => {
                    return executor.call(path, payload);
                });
            }
            else {
                walk(child, fullPath);
            }
        }
    };
    walk(tree, prefix);
    console.log(out);
    return out;
};
