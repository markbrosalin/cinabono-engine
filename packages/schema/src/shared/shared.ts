import { KindKey } from "./item/types";

export type WithOf<K extends KindKey, Map> = K extends `${infer C}:${infer R}`
  ? C extends keyof Map
    ? R extends keyof Map[C]
      ? Map[C][R]
      : never
    : never
  : never;
