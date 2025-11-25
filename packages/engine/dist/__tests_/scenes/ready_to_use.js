import { buildLinkId, parseLinkId } from "@cnbn/helpers";
import { mkToggle, mkScope, mkScopeChild, mkDeps, mkLamp, mkLogic, mkCircuit, } from "../fixtures/mkReadyToUse";
import { mkCircuitTemp, mkLogicTemp } from "../fixtures";
export const scene_items_of_custom_buffer = () => {
    // items
    const b1 = "buffer1", cb1 = "custom_buffer1", t1 = "toggle1", l1 = "lamp1";
    // links
    const t1_to_cb1 = buildLinkId(t1, "0", cb1, "0"), cb1_to_l1 = buildLinkId(cb1, "0", l1, "0");
    const items = {
        [b1]: mkLogic({
            id: b1,
            hash: "BUFFER",
            name: "BUFFER",
            path: ["root", "CUSTOM_BUFFER"],
        }),
        [cb1]: mkCircuit({
            id: cb1,
            hash: "CUSTOM_BUFFER",
            inputPins: {
                0: { value: "Z", inputItems: [{ itemId: b1, pin: "0" }] },
            },
            outputPins: {
                0: { value: "X", outputItem: { itemId: b1, pin: "0" } },
            },
        }),
        [t1]: mkToggle({ id: t1 }),
        [l1]: mkLamp({ id: l1 }),
    };
    const links = {
        [t1_to_cb1]: parseLinkId(t1_to_cb1),
        [cb1_to_l1]: parseLinkId(cb1_to_l1),
    };
    const templates = {
        [items[b1].hash]: mkLogicTemp("BUFFER"),
        [items[cb1].hash]: mkCircuitTemp("CUSTOM_BUFFER", {
            inputPins: {
                0: { value: "Z", inputItems: [{ itemId: b1, pin: "0" }] },
            },
            outputPins: {
                0: { value: "X", outputItem: { itemId: b1, pin: "0" } },
            },
            items: {
                [b1]: {
                    hash: items[b1].hash,
                    kind: items[b1].kind,
                    name: items[b1].name,
                    meta: items[b1].meta,
                    options: items[b1].options,
                },
            },
        }),
    };
    const scopes = {
        ["root"]: mkScope({
            id: "root",
            path: [],
            kind: "tab",
            storedItems: new Map(Object.entries({
                [cb1]: mkScopeChild({
                    inputLinks: { 0: t1_to_cb1 },
                    outputLinks: { 0: [cb1_to_l1] },
                }),
                [t1]: mkScopeChild({
                    outputLinks: { 0: [t1_to_cb1] },
                }),
                [l1]: mkScopeChild({
                    inputLinks: { 0: cb1_to_l1 },
                }),
            })),
            storedScopes: new Set([cb1]),
        }),
        ["CUSTOM_BUFFER"]: mkScope({
            id: "CUSTOM_BUFFER",
            kind: "circuit",
            path: ["root"],
            storedItems: new Map([[b1, mkScopeChild()]]),
        }),
    };
    const deps = mkDeps(items, scopes, links, templates);
    return {
        items,
        links,
        scopes,
        deps,
        inputs: [t1],
        outputs: [l1],
        logic: [cb1],
        templates,
    };
};
export const scene_items_of_rs_trigger = () => {
    // items
    const n1 = "nor1", n2 = "nor2", t1 = "toggle1", l1 = "lamp1";
    // links
    const n1_to_n2 = buildLinkId(n1, "0", n2, "0"), n2_to_n1 = buildLinkId(n2, "0", n1, "1"), t1_0_to_n1 = buildLinkId(t1, "0", n1, "0"), t1_1_to_n2 = buildLinkId(t1, "1", n2, "1"), n1_to_l1_0 = buildLinkId(n1, "0", l1, "0"), n2_to_l1_1 = buildLinkId(n2, "0", l1, "1");
    const items = {
        [n1]: mkLogic({
            id: n1,
            hash: "NOR",
            name: "NOR",
            meta: { isSymmetric: true },
            options: { delay: { rise: 5, fall: 5 } },
        }),
        [n2]: mkLogic({
            id: n2,
            hash: "NOR",
            name: "NOR",
            meta: { isSymmetric: true },
        }),
        [t1]: mkToggle({ id: t1, meta: { numOfOutputs: 2 } }),
        [l1]: mkLamp({ id: l1, meta: { numOfInputs: 2 } }),
    };
    const templates = {
        [items[n1].hash]: mkLogicTemp("NOR"),
        [items[n2].hash]: mkLogicTemp("NOR"),
    };
    const links = {
        [n1_to_n2]: parseLinkId(n1_to_n2),
        [n2_to_n1]: parseLinkId(n2_to_n1),
        [t1_0_to_n1]: parseLinkId(t1_0_to_n1),
        [t1_1_to_n2]: parseLinkId(t1_1_to_n2),
        [n1_to_l1_0]: parseLinkId(n1_to_l1_0),
        [n2_to_l1_1]: parseLinkId(n2_to_l1_1),
    };
    const scopes = {
        ["root"]: mkScope({
            id: "root",
            path: [],
            kind: "tab",
            storedItems: new Map(Object.entries({
                [t1]: mkScopeChild({
                    outputLinks: { 0: [t1_0_to_n1], 1: [t1_1_to_n2] },
                }),
                [l1]: mkScopeChild({
                    inputLinks: { 0: n1_to_l1_0, 1: n2_to_l1_1 },
                }),
                [n1]: mkScopeChild({
                    outputLinks: {
                        0: [n1_to_n2, n1_to_l1_0],
                    },
                    inputLinks: {
                        0: t1_0_to_n1,
                        1: n2_to_n1,
                    },
                }),
                [n2]: mkScopeChild({
                    outputLinks: {
                        0: [n2_to_n1, n2_to_l1_1],
                    },
                    inputLinks: {
                        0: n1_to_n2,
                        1: t1_1_to_n2,
                    },
                }),
            })),
        }),
    };
    const deps = mkDeps(items, scopes, links, templates);
    return {
        deps,
        items,
        scopes,
        links,
        templates,
        inputs: [t1],
        outputs: [l1],
        logic: [n1, n2],
    };
};
