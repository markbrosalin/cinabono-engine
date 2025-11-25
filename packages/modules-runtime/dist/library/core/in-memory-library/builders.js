const makeBaseEntry = (kind, name, args) => {
    return {
        hash: name,
        name,
        kind,
        ...args,
    };
};
export const makeBaseLogicEntry = (name, args) => {
    return makeBaseEntry("base:logic", name, args);
};
export const makeBaseGeneratorEntry = (name, args) => {
    return makeBaseEntry("base:generator", name, args);
};
export const makeBaseDisplayEntry = (name, args) => {
    return makeBaseEntry("base:display", name, args);
};
