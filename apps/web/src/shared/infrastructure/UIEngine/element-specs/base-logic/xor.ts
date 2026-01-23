import { BaseLogicSpec } from ".";

export const XOR_SPEC: BaseLogicSpec = {
    hash: "XOR",
    nodeName: "xor",
    iconPath: `
        M -12.948 11
        C -12.948 11 -9.008 7 -8.998 0
        C -8.998 -7 -12.998 -11 -12.998 -11

        M -8.948 11
        C -8.948 11 -5.008 7 -4.998 0
        C -4.998 -7 -8.998 -11 -8.998 -11

        M -8.948 11
        C 7.7888 11 9 -0.0005 9 -0.0005
        C 9 -0.0005 7.8737 -11 -9 -11

        M 17 0
        L 9 0

        M -6.5 -6
        L -16 -6

        M -6.5 6
        L -16 6`,
    minWidth: 66,
    minHeight: 34,
};
