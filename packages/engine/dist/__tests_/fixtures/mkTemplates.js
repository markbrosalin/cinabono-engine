export const mkCircuitTemp = (name, args) => {
    return {
        hash: name,
        kind: "circuit:logic",
        name,
        inputPins: args.inputPins,
        outputPins: args.outputPins,
        items: args.items,
        meta: args.meta,
        options: args.options,
    };
};
export const mkLogicTemp = (name, args = {}) => {
    return {
        hash: name,
        kind: "base:logic",
        name,
        ...args,
    };
};
