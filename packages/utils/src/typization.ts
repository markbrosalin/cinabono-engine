/* eslint-disable @typescript-eslint/no-explicit-any */

export const stub = <F extends (...args: any[]) => any>() => (() => {}) as F;
