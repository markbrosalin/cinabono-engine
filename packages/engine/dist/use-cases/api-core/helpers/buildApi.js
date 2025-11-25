/**
 *  Builds api tree with public and internal use cases
 */
export function buildAllApi(node, wrap, pref = "") {
    const out = {};
    for (const k in node) {
        const child = node[k];
        const path = pref ? `${pref}.${k}` : k;
        if (typeof child === "function" && child.__meta__) {
            out[k] = wrap(path, child);
        }
        else if (child && typeof child === "object") {
            out[k] = buildAllApi(child, wrap, path);
        }
    }
    return out;
}
/**
 *  Builds api tree with all only public use cases
 */
export function buildPublicApi(node, wrap, pref = "") {
    const out = {};
    for (const k in node) {
        const child = node[k];
        const path = pref ? `${pref}.${k}` : k;
        if (typeof child === "function" && child.__meta__) {
            if (child.__meta__.visibility === "public") {
                out[k] = wrap(path, child);
            }
        }
        else if (child && typeof child === "object") {
            const nested = buildPublicApi(child, wrap, path);
            if (Object.keys(nested).length)
                out[k] = nested;
        }
    }
    return out;
}
