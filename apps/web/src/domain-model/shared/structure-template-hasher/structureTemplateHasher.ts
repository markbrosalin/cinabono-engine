import { sha256 } from "js-sha256";
import stringify from "json-stable-stringify";
import {
    AssignedRoles,
    LinkNoId,
    NormalizedLink,
    NormalizedCustomTemplateInnerItem,
} from "./types";
import { TemplateGraphAnalyzer } from "./templateGraphAnalyzer";
import { isArrayOfArrays } from "@repo/utils";
import { DomainServiceError } from "../error-logger";
import { StructureTemplateHasherContract } from "./contracts";
import { forEach } from "lodash";
import {
    CircuitTemplate,
    InputItems,
    ItemLink,
    OutputItems,
    WithStructureData,
} from "@repo/schema";

export class StructureTemplateHasher implements StructureTemplateHasherContract {
    constructor(
        private readonly _template: CircuitTemplate,
        private readonly _analyzer: TemplateGraphAnalyzer
    ) {
        if (!_template || !_analyzer) throw new Error("Missing dependencies");
    }

    public getStructureData(): WithStructureData {
        const str = this.getStructureStr();
        const hash = sha256(str);
        return {
            hashVersion: "v1",
            hash,
            str,
        };
    }

    private getStructureStr(): WithStructureData["str"] {
        const normalizedItems = this.normalizeTemplate();
        const sorted = normalizedItems.sort();
        return stringify(sorted) || "";
    }

    private normalizeTemplate(): string[] {
        // 1. Назначаем роли по inputItems/outputItems (externalRole + externalPin)
        const idRoleMap = this.assignRoles(this._template);
        const pathsMap = this._analyzer.collectPathsToOutputs();

        // 2. Собираем новые items
        const items = [];

        for (const id in this._template.items) {
            const item = this._template.items[id];

            const normalized: NormalizedCustomTemplateInnerItem = {
                hash: item.hash,
                isEnable: item.isEnable || true,
                isSymmetric: item.isSymmetric || false,
            };

            if (idRoleMap[id]) {
                normalized.external = idRoleMap[id];
            }

            if (item.inputLinks) {
                normalized.inputLinks = this.normalizeInputConnections(item.inputLinks);
            }

            if (item.outputLinks) {
                normalized.outputLinks = this.normalizeOutputConnections(item.outputLinks);
            }

            if (pathsMap[id]) {
                normalized.pathsToOutputs = pathsMap[id];
            }

            items.push(stringify(normalized) || "");
        }
        return items;
    }

    //Назначаем элементам их роли входов или выходов схемы
    private assignRoles<T extends { inputItems: InputItems; outputItems: OutputItems }>(
        data: T
    ): AssignedRoles {
        const { inputItems, outputItems } = data;
        const result: AssignedRoles = {};

        const addRole = (items: InputItems | OutputItems) => {
            const isNested = isArrayOfArrays(items);
            const flat = isNested ? items.flat() : items;
            const role = isNested ? "input" : "output";

            forEach(flat, ({ id }, pinIdx) => {
                if (!result[id]) result[id] = [];
                result[id].push({ externalRole: role, externalPin: pinIdx });
            });
        };

        addRole(inputItems);
        addRole(outputItems);

        return result;
    }

    // Заменяем id входных соединений на объекты соединений, в которых id элементов заменены на их каноничные
    private normalizeInputConnections(conns: Record<number, ItemLink>): Record<number, string> {
        const result: Record<number, string> = {};

        for (const pin in conns) {
            const conn = conns[pin];
            if (!conn)
                throw new DomainServiceError(
                    "Невозможно заменить входные связи. Отсутствует необходимое соединение.",
                    { conn, conns }
                );

            const connWithoutId = this.getConnWithoutId(conn);
            result[pin] = stringify(this.replaceItemIdsWithHashes(connWithoutId)) || "";
        }
        return result;
    }

    // Заменяем id выходных соединений на объекты соединений, в которых id элементов заменены на их каноничные
    private normalizeOutputConnections(
        conns: Record<number, ItemLink[]>
    ): Record<number, string[]> {
        const result: Record<number, string[]> = {};

        for (const pin in conns) {
            const connsArr = conns[pin];
            result[pin] = connsArr
                .map((conn) => {
                    if (!conn)
                        throw new DomainServiceError(
                            "Невозможно заменить выходные связи. Отсутствует необходимое соединение.",
                            { conn, conns }
                        );

                    const connWithoutId = this.getConnWithoutId(conn);
                    return stringify(this.replaceItemIdsWithHashes(connWithoutId)) || "";
                })
                .sort();
        }
        return result;
    }

    private getConnWithoutId(conn: ItemLink): LinkNoId {
        const { id: _, ...rest } = conn;
        return rest;
    }

    private replaceItemIdsWithHashes(conn: LinkNoId): NormalizedLink {
        const clonedConn: NormalizedLink = { ...conn };

        const fromItem = this._template.items[conn.fromItemId];
        const toItem = this._template.items[conn.toItemId];

        clonedConn.fromItemId = fromItem.hash;
        clonedConn.toItemId = toItem.hash;

        const isSymmetric = toItem.isSymmetric ?? false;
        if (isSymmetric) {
            delete clonedConn.toPin;
        }

        return clonedConn;
    }
}
