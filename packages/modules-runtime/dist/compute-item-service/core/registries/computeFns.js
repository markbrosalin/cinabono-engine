const has = (inputPins, ...values) => {
    return Object.values(inputPins).some((p) => values.includes(p.value));
};
const every = (inputPins, value) => {
    return Object.values(inputPins).every((p) => p.value === value);
};
const count = (inputPins, value) => {
    return Object.values(inputPins).filter((p) => p.value === value).length;
};
export const computeBUFFER = ({ inputPins }) => {
    const v = inputPins[0].value;
    if (v === "0")
        return ["0"];
    if (v === "1")
        return ["1"];
    return [v === "C" ? "C" : "X"];
};
export const computeNOT = ({ inputPins }) => {
    const v = inputPins[0].value;
    if (v === "0")
        return ["1"];
    if (v === "1")
        return ["0"];
    return [v === "C" ? "C" : "X"];
};
export const computeAND = ({ inputPins }) => {
    if (has(inputPins, "0"))
        return ["0"];
    if (has(inputPins, "C") && !has(inputPins, "Z", "X", "0"))
        return ["C"];
    if (every(inputPins, "1"))
        return ["1"];
    return ["X"];
};
export const computeOR = ({ inputPins }) => {
    if (has(inputPins, "1"))
        return ["1"];
    if (has(inputPins, "C"))
        return ["C"];
    if (every(inputPins, "0"))
        return ["0"];
    return ["X"];
};
export const computeNOR = ({ inputPins }) => {
    if (has(inputPins, "1"))
        return ["0"];
    if (has(inputPins, "C") && !has(inputPins, "Z", "X", "1"))
        return ["C"];
    if (every(inputPins, "0"))
        return ["1"];
    return ["X"];
};
export const computeNAND = ({ inputPins }) => {
    if (has(inputPins, "0"))
        return ["1"];
    if (has(inputPins, "C"))
        return ["C"];
    if (every(inputPins, "1"))
        return ["0"];
    return ["X"];
};
export const computeXOR = ({ inputPins }) => {
    if (has(inputPins, "X", "Z"))
        return ["X"];
    if (has(inputPins, "C"))
        return ["C"];
    return [count(inputPins, "1") % 2 === 1 ? "1" : "0"];
};
export const computeXNOR = (item) => {
    const [val] = computeXOR(item);
    return val === "0" ? ["1"] : val === "1" ? ["0"] : [val];
};
