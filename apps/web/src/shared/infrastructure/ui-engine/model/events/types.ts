import type { SimulationBatchAppliedEvent } from "./simulation";
import { SIMULATION_BATCH_APPLIED_EVENT } from "./simulation";
import type {
    WorkspaceSessionNavigationChangedEvent,
    WorkspaceSessionTabClosedEvent,
    WorkspaceSessionTabCreatedEvent,
    WorkspaceSessionTabOpenedEvent,
} from "./workspace-session";
import {
    WORKSPACE_SESSION_NAVIGATION_CHANGED_EVENT,
    WORKSPACE_SESSION_TAB_CLOSED_EVENT,
    WORKSPACE_SESSION_TAB_CREATED_EVENT,
    WORKSPACE_SESSION_TAB_OPENED_EVENT,
} from "./workspace-session";

export type UIEngineEventMap = {
    [SIMULATION_BATCH_APPLIED_EVENT]: SimulationBatchAppliedEvent;
    [WORKSPACE_SESSION_TAB_CREATED_EVENT]: WorkspaceSessionTabCreatedEvent;
    [WORKSPACE_SESSION_TAB_OPENED_EVENT]: WorkspaceSessionTabOpenedEvent;
    [WORKSPACE_SESSION_TAB_CLOSED_EVENT]: WorkspaceSessionTabClosedEvent;
    [WORKSPACE_SESSION_NAVIGATION_CHANGED_EVENT]: WorkspaceSessionNavigationChangedEvent;
};

export type UIEngineEventName = keyof UIEngineEventMap;

export type UIEngineEventListener<K extends UIEngineEventName> = (
    event: UIEngineEventMap[K],
) => void;
