/* eslint-disable @typescript-eslint/no-explicit-any */

export type BaseObj<K extends PropertyKey = string, V = any> = Record<K, V>;

export type BaseFn<A extends any[] = any[], R = any> = (...args: A) => R;

export type BaseCtor<A extends any[] = any[], I = any> = new (...args: A) => I;
