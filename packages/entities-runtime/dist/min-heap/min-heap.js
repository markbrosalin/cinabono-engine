export class MinHeap {
    constructor(_less) {
        this._less = _less;
        this._heap = [];
    }
    peek() {
        return this._heap[0];
    }
    get values() {
        return this._heap;
    }
    get size() {
        return this._heap.length;
    }
    push(value) {
        this._heap.push(value);
        this._siftUp(this._heap.length - 1);
    }
    pop() {
        if (!this.size)
            return;
        const top = this.peek();
        const last = this._heap.pop();
        if (this.size > 0) {
            this._heap[0] = last;
            this._siftDown(0);
        }
        return top;
    }
    _siftUp(i) {
        const heap = this._heap;
        while (i > 0) {
            const parent = (i - 1) >> 1;
            if (!this._less(heap[i], heap[parent]))
                break;
            [heap[i], heap[parent]] = [heap[parent], heap[i]];
            i = parent;
        }
    }
    _siftDown(i) {
        const heap = this._heap;
        const n = heap.length;
        while (true) {
            const left = (i << 1) + 1;
            const right = left + 1;
            let smallest = i;
            if (left < n && this._less(heap[left], heap[smallest]))
                smallest = left;
            if (right < n && this._less(heap[right], heap[smallest]))
                smallest = right;
            if (smallest === i)
                break;
            [heap[i], heap[smallest]] = [heap[smallest], heap[i]];
            i = smallest;
        }
    }
}
