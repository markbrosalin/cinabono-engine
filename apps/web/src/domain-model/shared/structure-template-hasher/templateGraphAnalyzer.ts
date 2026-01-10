import { BFSQueue, PathsToOutputs } from "./types";
import { get, isEmpty, setWith, update } from "lodash";
import { DomainServiceError } from "../error-logger";
import { CircuitTemplate, CustomTemplateInnerItem, Id } from "@repo/schema";

export class TemplateGraphAnalyzer {
    constructor(private readonly _template: CircuitTemplate) {
        if (!_template) throw new Error("Missing dependencies");
    }

    collectPathsToOutputs(): Record<Id, PathsToOutputs> {
        const result: Record<Id, PathsToOutputs> = {};
        const queue: BFSQueue = [];

        this._template.outputItems.forEach(({ id, pin: outputPin }, externalPin) => {
            queue.push({
                id,
                outputPin,
                externalPin,
                path: [],
            });
            const visited: Record<Id, Set<number>> = {
                [id]: new Set([outputPin]),
            };

            while (!isEmpty(queue)) {
                const { id: currentId, outputPin: currentPin, path: currentPath } = queue.shift()!;
                const currentItem = this._template.items[currentId];
                const conns = currentItem.inputLinks ?? {};

                for (const inputPin in conns) {
                    const conn = conns[inputPin];

                    if (!conn)
                        throw new DomainServiceError(
                            "Невозможно провести анализ графа без необходимого соединения",
                            { conn, conns }
                        );

                    const { fromPin, fromItemId } = conn;

                    // Skip looped item
                    if (fromItemId === currentId && +inputPin === currentPin) continue;

                    // Skip visited pin
                    if (visited[fromItemId]?.has(fromPin)) continue;

                    updateVisited();

                    // Build path
                    const segment = this.makePathSegment(currentItem, +inputPin, fromPin);
                    const newPath = [segment, ...currentPath];

                    saveToResult();

                    // Add new point to explore
                    queue.push({
                        id: fromItemId,
                        outputPin: fromPin,
                        externalPin,
                        path: newPath,
                    });

                    function updateVisited() {
                        update(visited, [fromItemId], (set = new Set()) => {
                            set.add(fromPin);
                            return set;
                        });
                    }

                    function saveToResult() {
                        const keyPath = [fromItemId, externalPin];
                        const output = get(result, keyPath, []);
                        output.push(newPath);
                        setWith(result, keyPath, output, Object);
                    }
                }
            }
        });

        return result;
    }

    private makePathSegment(
        item: CustomTemplateInnerItem,
        inputPin: number,
        fromPin: number
    ): string {
        const isSymmetric = item.isSymmetric ?? false;
        return isSymmetric
            ? `inputPin:ANY_item:${item.hash}_outputPin:${fromPin}`
            : `inputPin:${inputPin}_item:${item.hash}_outputPin:${fromPin}`;
    }
}
