export const makeInputParams = (target) => {
    return {
        kind: "input",
        itemId: target.itemId,
        pin: target.pin,
        srcItemId: target.srcItemId,
        srcOutPin: target.srcOutPin,
        t: target.t,
        value: target.value,
        gen: target.gen,
    };
};
export const makeOutputParams = (target) => {
    return {
        kind: "output",
        itemId: target.itemId,
        pin: target.pin,
        t: target.t,
        value: target.value,
        gen: target.gen,
    };
};
