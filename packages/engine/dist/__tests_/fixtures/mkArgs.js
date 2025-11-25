export const mkCircuitArgs = (args) => {
    return {
        ...args,
    };
};
export const mkLogicArgs = (args) => {
    const name = args.hash.toUpperCase();
    return {
        kind: "base:logic",
        path: ["root"],
        ...args,
        name,
        hash: name,
    };
};
