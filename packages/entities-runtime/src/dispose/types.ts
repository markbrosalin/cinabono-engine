export interface KillableObject {
  kill(): void;
}

export type KillableRecord = Record<string, KillableObject>;
