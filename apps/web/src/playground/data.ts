import { ItemBuildResult } from "@gately/domain-model/shared/item-builder";
import { CircuitItem, LogicItem } from "@repo/schema";

export const buildData: ItemBuildResult = {
    items: [
        {
            id: "nor_0",
            hash: "NOR",
            hashVersion: "v1",
            path: ["scope_root"],
            category: "BASE_LOGIC",
            subCategory: "LOGIC",
            itemName: "NOR",
            inputPins: [{ value: "1" }, { value: "0" }],
            outputPins: [{ value: "0" }],
            delays: { rise: 1, fall: 1 },
        } satisfies LogicItem,
        {
            id: "nor_1",
            hash: "NOR",
            path: ["scope_root"],
            category: "BASE_LOGIC",
            subCategory: "LOGIC",
            itemName: "NOR",
            hashVersion: "v1",
            inputPins: [{ value: "0" }, { value: "0" }],
            outputPins: [{ value: "1" }],
            delays: { rise: 1, fall: 1 },
        } satisfies LogicItem,
        {
            id: "test_0",
            hash: "3BuffersAndNOT",
            path: ["scope_root"],
            category: "CUSTOM_LOGIC",
            subCategory: "CIRCUIT",
            itemName: "TEST",
            hashVersion: "v1",
            inputItems: [[{ id: "not_0", pin: 0 }]],
            outputItems: [{ id: "buf_2", pin: 0 }],
        } satisfies CircuitItem,
        {
            id: "not_0",
            hash: "NOT",
            path: ["scope_root", "test_0"],
            category: "BASE_LOGIC",
            subCategory: "LOGIC",
            itemName: "NOT",
            hashVersion: "v1",
            inputPins: [
                {
                    value: "1",
                    circuitPins: [{ circuitId: "test_0", circuitPin: 0 }],
                },
            ],
            outputPins: [{ value: "0" }],
            delays: { rise: 2, fall: 2 },
        } satisfies LogicItem,
        {
            id: "not_1",
            hash: "NOT",
            path: ["scope_root"],
            category: "BASE_LOGIC",
            subCategory: "LOGIC",
            itemName: "NOT",
            hashVersion: "v1",
            inputPins: [
                {
                    value: "0",
                },
            ],
            outputPins: [{ value: "1" }],
            delays: { rise: 2, fall: 2 },
        } satisfies LogicItem,
        {
            id: "buf_0",
            hash: "BUFFER",
            path: ["scope_root", "test_0"],
            category: "BASE_LOGIC",
            subCategory: "LOGIC",
            itemName: "BUFFER",
            hashVersion: "v1",
            inputPins: [{ value: "0" }],
            outputPins: [{ value: "1" }],
            delays: { rise: 2, fall: 2 },
        } satisfies LogicItem,
        {
            id: "buf_1",
            hash: "BUFFER",
            path: ["scope_root", "test_0"],
            category: "BASE_LOGIC",
            subCategory: "LOGIC",
            itemName: "BUFFER",
            hashVersion: "v1",
            inputPins: [{ value: "0" }],
            outputPins: [{ value: "0" }],
            delays: { rise: 2, fall: 2 },
        } satisfies LogicItem,
        {
            id: "buf_2",
            hash: "BUFFER",
            path: ["scope_root", "test_0"],
            category: "BASE_LOGIC",
            subCategory: "LOGIC",
            itemName: "BUFFER",
            hashVersion: "v1",
            inputPins: [{ value: "0" }],
            outputPins: [
                {
                    value: "0",
                    circuitPins: [{ circuitId: "test_0", circuitPin: 0 }],
                },
            ],
            delays: { rise: 2, fall: 2 },
        } satisfies LogicItem,
    ],

    scopes: [
        {
            id: "test_0",
            kind: "CIRCUIT",
            storedItems: new Map([
                [
                    "not_0",
                    {
                        inputLinks: {
                            0: "link_3",
                        },
                        outputLinks: {
                            0: ["link_3", "link_0"],
                        },
                    },
                ],
                [
                    "buf_0",
                    {
                        inputLinks: {
                            0: "link_0",
                        },
                        outputLinks: {
                            0: ["link_1"],
                        },
                    },
                ],
                [
                    "buf_1",
                    {
                        inputLinks: {
                            0: "link_1",
                        },
                        outputLinks: {
                            0: ["link_2"],
                        },
                    },
                ],
                [
                    "buf_2",
                    {
                        inputLinks: {
                            0: "link_2",
                        },
                    },
                ],
            ]),
            storedScopes: new Set(),
            path: ["scope_root"],
        },
        {
            id: "scope_root",
            kind: "TAB",
            path: [],
            storedItems: new Map([
                [
                    "not_1",
                    {
                        inputLinks: {
                            0: "link_4",
                        },
                    },
                ],
                [
                    "test_0",
                    {
                        outputLinks: {
                            0: ["link_4"],
                        },
                    },
                ],
                [
                    "nor_0",
                    {
                        inputLinks: {
                            0: "link_6",
                        },
                        outputLinks: {
                            0: ["link_5"],
                        },
                    },
                ],
                [
                    "nor_1",
                    {
                        inputLinks: {
                            0: "link_5",
                        },
                        outputLinks: {
                            0: ["link_6"],
                        },
                    },
                ],
            ]),
            storedScopes: new Set(["test_0"]),
        },
    ],

    links: [
        { id: "link_0", fromItemId: "not_0", fromPin: 0, toItemId: "buf_0", toPin: 0, delay: 0 },
        { id: "link_1", fromItemId: "buf_0", fromPin: 0, toItemId: "buf_1", toPin: 0, delay: 4 },
        { id: "link_2", fromItemId: "buf_1", fromPin: 0, toItemId: "buf_2", toPin: 0, delay: 4 },
        { id: "link_3", fromItemId: "not_0", fromPin: 0, toItemId: "not_0", toPin: 0, delay: 0 },
        { id: "link_4", fromItemId: "test_0", fromPin: 0, toItemId: "not_1", toPin: 0, delay: 5 },
        { id: "link_5", fromItemId: "nor_0", fromPin: 0, toItemId: "nor_1", toPin: 0, delay: 0 },
        { id: "link_6", fromItemId: "nor_1", fromPin: 0, toItemId: "nor_0", toPin: 0, delay: 0 },
    ],

    readyPins: [{ id: "not_0", pins: [0] }],
};
