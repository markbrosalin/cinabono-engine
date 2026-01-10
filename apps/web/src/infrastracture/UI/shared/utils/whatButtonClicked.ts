export const isLeftButton = (e: MouseEvent) => e.button === 0;

export const isMiddleButton = (e: MouseEvent) => e.button === 1;

export const isRightButton = (e: MouseEvent) => e.button === 2;

export const isEnterClicked = (e: KeyboardEvent) => e.key === "Enter";

export const isEscapeClicked = (e: KeyboardEvent) => e.key === "Escape";
