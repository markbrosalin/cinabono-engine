export type Direction = "right" | "top" | "left" | "bottom";
export type Axis = "x" | "y";
export type Language = "ru" | "en";
export type Theme = "light" | "dark";

export type PartialExceptId<T extends { id: string }> = Partial<Omit<T, "id">>;

export type XYCoords = { x: number; y: number };
export type ScaleFactor = number;
export type XYOffset = { dx: number; dy: number };
