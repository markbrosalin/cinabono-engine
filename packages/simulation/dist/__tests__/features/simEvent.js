export const mkSimInputEvent = (ev = {}) => {
    return {
        itemId: "A",
        pin: "0",
        value: "1",
        t: 0,
        kind: "input",
        delta: 0,
        seq: 0,
        ...ev,
    };
};
export const mkSimOutputEvent = (ev = {}) => {
    return {
        itemId: "A",
        pin: "0",
        value: "1",
        t: 0,
        kind: "output",
        delta: 0,
        seq: 0,
        ...ev,
    };
};
