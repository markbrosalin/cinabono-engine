import { KindKey, ItemArgsOfKind, ItemOfKind } from "@cnbn/schema";
export interface ItemCreatorContract {
    create<K extends KindKey>(args: ItemArgsOfKind<K>): ItemOfKind<K>;
}
export declare class DefaultItemCreator implements ItemCreatorContract {
    private readonly _get;
    create<K extends KindKey>(args: ItemArgsOfKind<K>): ItemOfKind<K>;
    private _baseFields;
    private _buildGenerator;
    private _buildLogic;
    private _buildDisplay;
    private _buildCircuit;
}
//# sourceMappingURL=creator.d.ts.map