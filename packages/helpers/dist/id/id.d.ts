import { Id, WithId } from "@cnbn/schema/shared";
export declare const getOrCreateId: (oldId: Id, oldToNewIdMap: Map<Id, Id>) => string;
export declare const getMappedId: (oldId: Id, oldToNewIdMap: Map<Id, Id>) => Id;
export declare const extractIds: (input: Id | Id[] | WithId | WithId[]) => Id[];
//# sourceMappingURL=id.d.ts.map