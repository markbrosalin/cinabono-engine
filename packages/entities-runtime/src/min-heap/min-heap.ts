export type MinHeap_LessFn<T> = (a: T, b: T) => boolean;

export class MinHeap<T> {
    private _heap: T[] = [];

    constructor(private readonly _less: MinHeap_LessFn<T>) {}

    public peek(): T | undefined {
        return this._heap[0];
    }

    public get values(): T[] {
        return this._heap;
    }

    public get size(): number {
        return this._heap.length;
    }

    public push(value: T): void {
        this._heap.push(value);
        this._siftUp(this._heap.length - 1);
    }

    public pop(): T | undefined {
        if (!this.size) return;

        const top = this.peek();
        const last = this._heap.pop()!;

        if (this.size > 0) {
            this._heap[0] = last;
            this._siftDown(0);
        }
        return top;
    }

    private _siftUp(i: number): void {
        const heap = this._heap;
        while (i > 0) {
            const parent = (i - 1) >> 1;
            if (!this._less(heap[i], heap[parent])) break;
            [heap[i], heap[parent]] = [heap[parent], heap[i]];
            i = parent;
        }
    }

    private _siftDown(i: number): void {
        const heap = this._heap;
        const n = heap.length;
        while (true) {
            const left = (i << 1) + 1;
            const right = left + 1;
            let smallest = i;

            if (left < n && this._less(heap[left], heap[smallest])) smallest = left;

            if (right < n && this._less(heap[right], heap[smallest])) smallest = right;

            if (smallest === i) break;

            [heap[i], heap[smallest]] = [heap[smallest], heap[i]];
            i = smallest;
        }
    }
}
