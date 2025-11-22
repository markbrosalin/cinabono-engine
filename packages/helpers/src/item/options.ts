import { AutoTriggers, isItem, isTemplate, ItemOfKind, TemplateOfKind } from "@cnbn/schema";

// export const defaultAutoTriggers = (
//   arg: TemplateOfKind | ItemOfKind
// ): AutoTriggers => {
//   const getFrom = (data: Record<string, unknown>): AutoTriggers => {
//     return Object.fromEntries(
//       Object.keys(data).map((key) => [key, {kind: getDefaultSignalKind(arg), initialValue: '0' } satisfies AutoTriggers[string]])
//     ) as AutoTriggers;
//   };

//   if (isTemplate(arg) && hasOutputPins(arg)) {
//     return getFrom(arg.outputPins);
//   } else if (isItem(arg) && hasOutputPins(arg)) {
//     return getFrom(arg.outputPins);
//   }
//   return {};
// };

// type OptionsBuilder<K extends SubCategory> = (t: TemplateOf<K>) => OptionsOf<K>;

// const defaultOptionsBySubCategory = {
//   GENERATOR: (t: TemplateOf<"GENERATOR">): OptionsOf<"GENERATOR"> => ({
//     autoTriggers: defaultAutoTriggers(t),
//     isEnable: true,
//     ...t.options,
//   }),
//   LOGIC: (t: TemplateOf<"LOGIC">): OptionsOf<"LOGIC"> => ({
//     isEnable: true,
//     isSymmetric: true,
//     autoTriggers: defaultAutoTriggers(t),
//     ...t.options,
//   }),
//   DISPLAY: (t: TemplateOf<"DISPLAY">): OptionsOf<"DISPLAY"> => ({
//     isEnable: true,
//     ...t.options,
//   }),
//   CIRCUIT: (t: TemplateOf<"CIRCUIT">): OptionsOf<"CIRCUIT"> => ({
//     isEnable: true,
//     ...t.options,
//   }),
//   BAKED: (t: TemplateOf<"BAKED">): OptionsOf<"BAKED"> => ({
//     isEnable: true,
//     ...t.options,
//   }),
// } satisfies {
//   [S in SubCategory]: OptionsBuilder<S>;
// };

// export const makeDefaultOptions = <K extends SubCategory>(
//   template: TemplateOf<K>
// ): OptionsOf<K> => {
//   const builder = defaultOptionsBySubCategory[
//     template.subCategory
//   ] as OptionsBuilder<K>;
//   return builder(template);
// };
