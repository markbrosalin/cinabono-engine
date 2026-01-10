import {
    CircuitTemplate,
    DisplayTemplate,
    GeneratorTemplate,
    Hash,
    LogicTemplate,
    Template,
} from "@repo/schema";
import { CircuitInnerItem } from "../../../../../../../../packages/schema/dist/shared/IO-map/IO.map";

export const templatesMap = new Map<Hash, Template>([
    [
        "TOGGLE",
        {
            hash: "TOGGLE",
            hashVersion: "v1",
            category: "BASE_LOGIC",
            subCategory: "GENERATOR",
            itemName: "TOGGLE",
            outputValues: [0],
        } satisfies GeneratorTemplate,
    ],
    [
        "PUSH_BUTTON",
        {
            hash: "PUSH_BUTTON",
            hashVersion: "v1",
            category: "BASE_LOGIC",
            subCategory: "GENERATOR",
            itemName: "PUSH_BUTTON",
            outputValues: [0],
        } satisfies GeneratorTemplate,
    ],
    [
        "CLOCK",
        {
            hash: "CLOCK",
            hashVersion: "v1",
            category: "BASE_LOGIC",
            subCategory: "GENERATOR",
            itemName: "CLOCK",
            outputValues: [0],
            options: {
                isEnable: true,
            },
        } satisfies GeneratorTemplate,
    ],
    [
        "TRUE_CONSTANT",
        {
            hash: "TRUE_CONSTANT",
            hashVersion: "v1",
            category: "BASE_LOGIC",
            subCategory: "GENERATOR",
            itemName: "TRUE_CONSTANT",
            outputValues: [1],
        } satisfies GeneratorTemplate,
    ],
    [
        "FALSE_CONSTANT",
        {
            hash: "FALSE_CONSTANT",
            hashVersion: "v1",
            category: "BASE_LOGIC",
            subCategory: "GENERATOR",
            itemName: "FALSE_CONSTANT",
            outputValues: [0],
        } satisfies GeneratorTemplate,
    ],
    [
        "LAMP",
        {
            hash: "LAMP",
            hashVersion: "v1",
            category: "BASE_LOGIC",
            subCategory: "DISPLAY",
            itemName: "LAMP",
            inputValues: [0],
        } satisfies DisplayTemplate,
    ],
    [
        "BUFFER",
        {
            hash: "BUFFER",
            hashVersion: "v1",
            category: "BASE_LOGIC",
            subCategory: "LOGIC",
            itemName: "BUFFER",
            inputValues: [0],
            outputValues: [0],
        } satisfies LogicTemplate,
    ],
    [
        "NOT",
        {
            hash: "NOT",
            hashVersion: "v1",
            category: "BASE_LOGIC",
            subCategory: "LOGIC",
            itemName: "NOT",
            outputValues: [1],
            inputValues: [0],
        } satisfies LogicTemplate,
    ],
    [
        "OR",
        {
            hash: "OR",
            hashVersion: "v1",
            category: "BASE_LOGIC",
            subCategory: "LOGIC",
            itemName: "OR",
            inputValues: [0, 0],
            outputValues: [0],
            options: {
                isSymmetric: true,
            },
        } satisfies LogicTemplate,
    ],
    [
        "AND",
        {
            hash: "AND",
            hashVersion: "v1",
            category: "BASE_LOGIC",
            subCategory: "LOGIC",
            itemName: "AND",
            inputValues: [0, 0],
            outputValues: [0],
            options: {
                isSymmetric: true,
            },
        } satisfies LogicTemplate,
    ],
    [
        "NOR",
        {
            hash: "NOR",
            hashVersion: "v1",
            category: "BASE_LOGIC",
            subCategory: "LOGIC",
            itemName: "NOR",
            inputValues: [0, 0],
            outputValues: [1],
            options: {
                isSymmetric: true,
            },
        } satisfies LogicTemplate,
    ],
    [
        "NAND",
        {
            hash: "NAND",
            hashVersion: "v1",
            category: "BASE_LOGIC",
            subCategory: "LOGIC",
            itemName: "NAND",
            inputValues: [0, 0],
            outputValues: [1],
            options: {
                isSymmetric: true,
            },
        } satisfies LogicTemplate,
    ],
    [
        "XOR",
        {
            hash: "XOR",
            hashVersion: "v1",
            category: "BASE_LOGIC",
            subCategory: "LOGIC",
            itemName: "XOR",
            inputValues: [0, 0],
            outputValues: [0],
            options: {
                isSymmetric: true,
            },
        } satisfies LogicTemplate,
    ],
    [
        "XNOR",
        {
            hash: "XNOR",
            hashVersion: "v1",
            category: "BASE_LOGIC",
            subCategory: "LOGIC",
            itemName: "XNOR",
            inputValues: [0, 0],
            outputValues: [1],
            options: {
                isSymmetric: true,
            },
        } satisfies LogicTemplate,
    ],
    [
        "8f85ed71d6126840fc481f491e56f37d5e98cd709253708279a21acf90186c25",
        {
            hash: "8f85ed71d6126840fc481f491e56f37d5e98cd709253708279a21acf90186c25",
            hashVersion: "v1",
            category: "CUSTOM_LOGIC",
            subCategory: "CIRCUIT",
            itemName: "RS-TRIGGER",
            inputItems: [[{ id: "NOR_0", pin: 0 }], [{ id: "NOR_1", pin: 1 }]],
            outputItems: [
                { id: "NOR_0", pin: 0 },
                { id: "NOR_1", pin: 0 },
            ],
            items: {
                NOR_0: {
                    hash: "NOR",
                    hashVersion: "v1",
                    category: "BASE_LOGIC",
                    subCategory: "LOGIC",
                    itemName: "NOR",
                    inputLinks: {
                        1: {
                            id: "RS-TRIGGER:NOR_1[0]-to-NOR_0[1]",
                            fromItemId: "NOR_1",
                            toItemId: "NOR_0",
                            fromPin: 0,
                            toPin: 1,
                        },
                    },
                    outputLinks: {
                        0: [
                            {
                                id: "RS-TRIGGER:NOR_0[0]-to-NOR_1[0]",
                                fromItemId: "NOR_0",
                                toItemId: "NOR_1",
                                fromPin: 0,
                                toPin: 0,
                            },
                        ],
                    },
                } satisfies CircuitInnerItem<"LOGIC">,
                NOR_1: {
                    hash: "NOR",
                    hashVersion: "v1",
                    category: "BASE_LOGIC",
                    subCategory: "LOGIC",
                    itemName: "NOR",
                    inputLinks: {
                        0: {
                            id: "RS-TRIGGER:NOR_0[0]-to-NOR_1[0]",
                            fromItemId: "NOR_0",
                            toItemId: "NOR_1",
                            fromPin: 0,
                            toPin: 0,
                        },
                    },
                    outputLinks: {
                        0: [
                            {
                                id: "RS-TRIGGER:NOR_1[0]-to-NOR_0[1]",
                                fromItemId: "NOR_1",
                                toItemId: "NOR_0",
                                fromPin: 0,
                                toPin: 1,
                            },
                        ],
                    },
                } satisfies CircuitInnerItem<"LOGIC">,
            },
        } satisfies CircuitTemplate,
    ],
    [
        "1",
        {
            hash: "1",
            hashVersion: "v1",
            category: "CUSTOM_LOGIC",
            subCategory: "CIRCUIT",
            itemName: "TEST",
            inputItems: [[{ id: "RS-TRIGGER", pin: 0 }], [{ id: "RS-TRIGGER_1", pin: 1 }]],
            outputItems: [
                { id: "RS-TRIGGER", pin: 0 },
                { id: "RS-TRIGGER_1", pin: 0 },
            ],
            items: {
                AND_0: {
                    hash: "AND",
                    hashVersion: "v1",
                    category: "BASE_LOGIC",
                    subCategory: "LOGIC",
                    itemName: "AND",
                } satisfies CircuitInnerItem<"LOGIC">,
                AND_1: {
                    hash: "AND",
                    hashVersion: "v1",
                    category: "BASE_LOGIC",
                    subCategory: "LOGIC",
                    itemName: "AND",
                } satisfies CircuitInnerItem<"LOGIC">,
                "RS-TRIGGER": {
                    hash: "8f85ed71d6126840fc481f491e56f37d5e98cd709253708279a21acf90186c25",
                    hashVersion: "v1",
                    category: "CUSTOM_LOGIC",
                    subCategory: "CIRCUIT",
                    itemName: "RS-TRIGGER",
                } satisfies CircuitInnerItem<"CIRCUIT">,
                "RS-TRIGGER_1": {
                    hash: "8f85ed71d6126840fc481f491e56f37d5e98cd709253708279a21acf90186c25",
                    hashVersion: "v1",
                    category: "CUSTOM_LOGIC",
                    subCategory: "CIRCUIT",
                    itemName: "RS-TRIGGER",
                } satisfies CircuitInnerItem<"CIRCUIT">,
            },
        } satisfies CircuitTemplate,
    ],
    [
        "3BuffersAndNOT",
        {
            hash: "3BuffersAndNOT",
            hashVersion: "v1",
            category: "CUSTOM_LOGIC",
            subCategory: "CIRCUIT",
            itemName: "TEST",
            inputItems: [[{ id: "NOT_0", pin: 0 }]],
            outputItems: [{ id: "BUFFER_2", pin: 0 }],
            items: {
                NOT_0: {
                    hash: "NOT",
                    hashVersion: "v1",
                    category: "BASE_LOGIC",
                    subCategory: "LOGIC",
                    itemName: "NOT",
                    outputLinks: {
                        0: [
                            {
                                id: "not_0->buffer_0",
                                fromItemId: "NOT_0",
                                fromPin: 0,
                                toItemId: "BUFFER_0",
                                toPin: 0,
                            },
                        ],
                    },
                } satisfies CircuitInnerItem<"LOGIC">,
                BUFFER_0: {
                    hash: "BUFFER",
                    hashVersion: "v1",
                    category: "BASE_LOGIC",
                    subCategory: "LOGIC",
                    itemName: "BUFFER",
                    inputLinks: {
                        0: {
                            id: "not_0->buffer_0",
                            fromItemId: "NOT_0",
                            fromPin: 0,
                            toItemId: "BUFFER_0",
                            toPin: 0,
                        },
                    },
                    outputLinks: {
                        0: [
                            {
                                id: "buffer_0->buffer_1",
                                fromItemId: "BUFFER_0",
                                fromPin: 0,
                                toItemId: "BUFFER_1",
                                toPin: 0,
                            },
                        ],
                    },
                } satisfies CircuitInnerItem<"LOGIC">,
                BUFFER_1: {
                    hash: "BUFFER",
                    hashVersion: "v1",
                    category: "BASE_LOGIC",
                    subCategory: "LOGIC",
                    itemName: "BUFFER",
                    inputLinks: {
                        0: {
                            id: "buffer_0->buffer_1",
                            fromItemId: "BUFFER_0",
                            fromPin: 0,
                            toItemId: "BUFFER_1",
                            toPin: 0,
                        },
                    },
                    outputLinks: {
                        0: [
                            {
                                id: "buffer_1->buffer_2",
                                fromItemId: "BUFFER_1",
                                fromPin: 0,
                                toItemId: "BUFFER_2",
                                toPin: 0,
                            },
                        ],
                    },
                } satisfies CircuitInnerItem<"LOGIC">,
                BUFFER_2: {
                    hash: "BUFFER",
                    hashVersion: "v1",
                    category: "BASE_LOGIC",
                    subCategory: "LOGIC",
                    itemName: "BUFFER",
                    inputLinks: {
                        0: {
                            id: "buffer_1->buffer_2",
                            fromItemId: "BUFFER_1",
                            fromPin: 0,
                            toItemId: "BUFFER_2",
                            toPin: 0,
                        },
                    },
                } satisfies CircuitInnerItem<"LOGIC">,
            },
        } satisfies CircuitTemplate,
    ],
]);
