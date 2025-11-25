import { mkDefaultPins } from "@cnbn/helpers";
export const mkLamp = (args) => ({
    path: ["root"],
    kind: "base:display",
    inputPins: mkDefaultPins(args.meta?.numOfInputs ?? 1, () => ({
        value: "X",
    })),
    hash: "LAMP",
    name: "LAMP",
    ...args,
});
export const mkToggle = (args) => {
    return {
        path: ["root"],
        kind: "base:generator",
        outputPins: mkDefaultPins(args.meta?.numOfOutputs ?? 1, () => ({
            value: "Z",
        })),
        name: "TOGGLE",
        hash: "TOGGLE",
        ...args,
    };
};
export const mkLogic = (args) => {
    const name = args.hash.toUpperCase();
    return {
        path: ["root"],
        kind: "base:logic",
        inputPins: mkDefaultPins(1, () => ({ value: "Z" })),
        outputPins: mkDefaultPins(1, () => ({ value: "X" })),
        ...args,
        hash: name,
        name,
    };
};
export const mkCircuit = (args) => {
    const name = args.hash.toUpperCase();
    return {
        path: ["root"],
        kind: "circuit:logic",
        ...args,
        hash: name,
        name,
    };
};
export const mkScopeChild = ({ inputLinks, outputLinks } = {}) => ({
    inputLinks,
    outputLinks,
});
export const mkScope = (args) => ({
    id: "scope1",
    path: ["root"],
    storedScopes: new Set(),
    storedItems: new Map(),
    ...args,
});
export const mkDeps = (items = {}, scopes = {}, links = {}, library = {}) => ({
    getItem: (id) => items[id],
    getScope: (id) => scopes[id],
    getLink: (id) => links[id],
    getTemplate: (strHash) => library[strHash],
});
