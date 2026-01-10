import { createTabItem } from "./tabStorageItem.factories";
import { AppStorage } from "./storage";

type AppStorageType = typeof AppStorage;

export interface PathData {
    id: string;
    title: string;
}

export type Language = "ru" | "en";
export type Theme = "light" | "dark";

export type UITabData = ReturnType<typeof createTabItem>;

export interface XYcoords { x: number; y: number }

export type WorkspaceSettings = AppStorageType["WORKSPACE_SETTINGS"];
export type TabSettings = AppStorageType["TAB_SETTINGS"];
export type HierarchySettings = AppStorageType["HIERARCHY"];
export type PreferencesSettings = AppStorageType["PREFERENCES"];
