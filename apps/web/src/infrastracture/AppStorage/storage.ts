import { createSignal } from "solid-js";
import { Language, Theme, UITabData } from "./types";
import { createStore } from "solid-js/store";

export const AppStorage = {
    TAB_SETTINGS: {
        preferences: {},
        data: {
            ActiveTabId: createSignal<string>(""),
        },
        runtimeFlags: {
            IsTabHovered: createSignal<boolean>(false),
            IsTabEditing: createSignal<boolean>(false),
        },
    },
    WORKSPACE_SETTINGS: {
        preferences: {
            isSnappedToGrid: createSignal(false),
            ZOOM_LIMITS: {
                min: 0.5,
                max: 4,
            },
        },
        data: {},
        runtimeFlags: {
            IsGridDragging: createSignal<boolean>(false),
            IsGridZooming: createSignal<boolean>(false),
        },
    },
    HIERARCHY: {
        preferences: {},
        data: createStore<UITabData[]>([]),
        runtimeFlags: {},
    },
    PREFERENCES: {
        theme: createSignal<Theme>("light"),
        lang: createSignal<Language>("en"),
    },
};
