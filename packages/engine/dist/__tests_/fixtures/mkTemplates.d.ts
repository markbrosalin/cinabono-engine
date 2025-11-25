import { TemplateOfKind, LogicItemName, ItemOfKind } from "@cnbn/schema";
export declare const mkCircuitTemp: (name: string, args: Pick<TemplateOfKind<"circuit:logic">, "meta" | "options" | "inputPins" | "outputPins" | "items">) => TemplateOfKind<"circuit:logic">;
export declare const mkLogicTemp: (name: LogicItemName, args?: Pick<ItemOfKind<"base:logic">, "meta" | "options">) => TemplateOfKind<"base:logic">;
//# sourceMappingURL=mkTemplates.d.ts.map