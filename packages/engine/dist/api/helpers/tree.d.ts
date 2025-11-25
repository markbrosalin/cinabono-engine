import { BaseObj } from "@repo/schema";
/**
 * @returns array of parts without empty strings
 * @example /math//add => ['math','add']
 */
export declare function getPartsOfPath(path: string): string[];
/**
 * @returns value from the object according to the path
 */
export declare function getByPath<T extends BaseObj>(root: T, path: string): unknown;
/**
 * Creates nested objects along the path /.../...
 * and assigns a value to the last
 */
export declare function assignByPath(root: BaseObj, path: string, value: unknown): void;
/**
 *  Checks if root has nested objects by path
 */
export declare function hasPath(root: BaseObj, path: string): boolean;
//# sourceMappingURL=tree.d.ts.map