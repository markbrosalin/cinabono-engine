export const events = {
    ChangeActiveTab: "UI.CHANGE_ACTIVE_TAB",

    CreateTab: "UI.CREATE_TAB",
    TempTabCreated: "SAGA.TEMP_TAB_CREATED",
    RealTabCreated: "SAGA.REAL_TAB_CREATED",

    RemoveTab: "UI.CLOSE_TAB",
    TabRemoved: "SAGA.TAB_CLOSED",

    CreateItem: "UI.CREATE_ITEM",
    ItemCreated: "SAGA.ITEM_CREATED",

    RemoveItem: "UI.REMOVE_ITEM",
    ItemRemoved: "SAGA.ITEM_REMOVED",

    SimulateItem: "UI.SIMULATE_ITEM",
    SimulatedResult: "SIMULATION.RESULT",
} as const;

export type EventName = (typeof events)[keyof typeof events];
