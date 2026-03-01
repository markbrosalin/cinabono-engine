import { createStore } from "solid-js/store";
import { describe, expect, it } from "vitest";
import { createTabSessionService } from "./createTabSessionService";
import type { ScopeStore } from "../types";

describe("createTabSessionService", () => {
    const createState = () => {
        const [store, setStore] = createStore<ScopeStore>({
            scopes: {},
            activeScopeId: undefined,
            tabSessions: {},
            activeTabId: undefined,
        });

        return { store, setStore };
    };

    it("creates a tab session with default navigation path", () => {
        const { store, setStore } = createState();
        const service = createTabSessionService(store, setStore);

        const session = service.createTabSession({
            tabId: "tab-1",
            rootScopeId: "tab-1",
        });

        expect(session.navigationPath).toEqual(["tab-1"]);
        expect(service.getTabSession("tab-1")?.simulation).toEqual({
            mode: "instant",
            status: "idle",
        });
    });

    it("sets active tab and clears it when session is removed", () => {
        const { store, setStore } = createState();
        const service = createTabSessionService(store, setStore);

        service.createTabSession({
            tabId: "tab-1",
            rootScopeId: "tab-1",
            options: { setActive: true },
        });

        expect(service.activeTabId()).toBe("tab-1");

        service.removeTabSession("tab-1");

        expect(service.activeTabId()).toBeUndefined();
    });
});
