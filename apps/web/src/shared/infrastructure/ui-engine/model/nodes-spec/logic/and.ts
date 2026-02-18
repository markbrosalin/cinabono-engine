import { BaseLogicSpec } from ".";

export const AND_SPEC: BaseLogicSpec = {
    hash: "AND",
    nodeName: "and",
    iconPath: `
        M -1.7 -11
        C 4.3 -11 9 -6 9 0
        C 9 6 4 11 -2 11
        H -7
        C -8 11 -8 10.6 -8 10
        V -10
        C -8 -10.6 -7.6 -11 -7 -11
        H -2

        M -8 -6
        L -16 -6

        M -9 6
        L -16 6

        M 17 0
        L 9 0`,
    minWidth: 64,
    minHeight: 48,
};
