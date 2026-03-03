import { createVisualBinding } from "../../../visual";
import { createBaseNodeMarkup } from "../../base";
import { resolveSevenSegState } from "./resolver";
import { SEVEN_SEG_DISPLAY_PATH } from "./svg";

export const SEVEN_SEG_DISPLAY_VISUAL = createVisualBinding({
    hash: "7_SEG_DISPLAY",
    nodeName: "7-Segment Display",
    minWidth: 96,
    minHeight: 144,
    base: {
        markup: [
            ...createBaseNodeMarkup({
                afterIcon: [
                    { tagName: "path", selector: "a" },
                    { tagName: "path", selector: "b" },
                    { tagName: "path", selector: "c" },
                    { tagName: "path", selector: "d" },
                    { tagName: "path", selector: "e" },
                    { tagName: "path", selector: "f" },
                    { tagName: "path", selector: "g" },
                    { tagName: "path", selector: "dot" },
                ],
            }),
        ],
        attrs: {
            body: {
                class: "seven-seg-display-body",
                fill: "var(--color-black)",
            },
            a: {
                class: "a-segment",
                d: SEVEN_SEG_DISPLAY_PATH.a,
            },
            b: {
                class: "b-segment",
                d: SEVEN_SEG_DISPLAY_PATH.b,
            },
            c: {
                class: "c-segment",
                d: SEVEN_SEG_DISPLAY_PATH.c,
            },
            d: {
                class: "d-segment",
                d: SEVEN_SEG_DISPLAY_PATH.d,
            },
            e: {
                class: "e-segment",
                d: SEVEN_SEG_DISPLAY_PATH.e,
            },
            f: {
                class: "f-segment",
                d: SEVEN_SEG_DISPLAY_PATH.f,
            },
            g: {
                class: "g-segment",
                d: SEVEN_SEG_DISPLAY_PATH.g,
            },
            dot: {
                class: "dot-segment",
                d: SEVEN_SEG_DISPLAY_PATH.dot,
            },
        },
    },
    resolveState: resolveSevenSegState,
});
