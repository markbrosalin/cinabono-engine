/* eslint-disable @typescript-eslint/no-explicit-any */

// Typed stub function
export const stub = <F extends (...args: any[]) => any>() => (() => {}) as F;
