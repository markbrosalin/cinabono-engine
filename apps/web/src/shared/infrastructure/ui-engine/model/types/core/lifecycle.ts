export type UIEngineLifecycleEvent =
    | {
          type: "service:created";
          label: string;
          name: string;
      }
    | {
          type: "plugin:applied";
          label: string;
          name: string;
      }
    | {
          type: "plugin:disposed";
          label: string;
          name: string;
      };

export type UIEngineHooks = {
    onLifecycle?: (event: UIEngineLifecycleEvent) => void;
};
