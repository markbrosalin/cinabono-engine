export const scene_args_of_rs_trigger = (rsTrigger_id = "rs-trigger1", nor1_id = "nor1", nor2_id = "nor2") => {
    const args = {
        id: rsTrigger_id,
        hash: "rs-trigger",
        name: "RS-TRIGGER",
        kind: "circuit:logic",
        path: ["root"],
        inputPins: {
            "0": {
                inputItems: [
                    {
                        itemId: nor1_id,
                        pin: "0",
                    },
                ],
            },
            "1": {
                inputItems: [
                    {
                        itemId: nor2_id,
                        pin: "1",
                    },
                ],
            },
        },
        outputPins: {
            "0": {
                outputItem: {
                    itemId: nor1_id,
                    pin: "0",
                },
            },
            "1": {
                outputItem: {
                    itemId: nor2_id,
                    pin: "0",
                },
            },
        },
        items: {
            [nor1_id]: {
                hash: "NOR",
                kind: "base:logic",
                name: "NOR",
                inputLinks: {
                    "1": `${nor2_id}:0:${nor1_id}:1`,
                },
                outputLinks: {
                    "0": [`${nor1_id}:0:${nor2_id}:0`],
                },
                options: {
                    delay: {
                        rise: 5,
                        fall: 5,
                    },
                },
                meta: {
                    isSymmetric: true,
                },
            },
            [nor2_id]: {
                hash: "NOR",
                kind: "base:logic",
                name: "NOR",
                inputLinks: {
                    "0": `${nor1_id}:0:${nor2_id}:0`,
                },
                outputLinks: {
                    "0": [`${nor2_id}:0:${nor1_id}:1`],
                },
                meta: {
                    isSymmetric: true,
                },
            },
        },
    };
    return args;
};
