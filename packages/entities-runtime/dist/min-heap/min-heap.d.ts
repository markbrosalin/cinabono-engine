export type MinHeap_LessFn<T> = (a: T, b: T) => boolean;
export declare class MinHeap<T> {
    private readonly _less;
    private _heap;
    constructor(_less: MinHeap_LessFn<T>);
    peek(): T | undefined;
    get values(): T[];
    get size(): number;
    push(value: T): void;
    pop(): T | undefined;
    private _siftUp;
    private _siftDown;
}
//# sourceMappingURL=min-heap.d.ts.map