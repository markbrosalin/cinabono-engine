import { KindKey, CategoryOf, RoleOf } from "./item";

export const getItemCategory = <K extends KindKey>(kind: K): CategoryOf<K> => {
  return kind.split(":")[0] as CategoryOf<K>;
};

export const getItemRole = <K extends KindKey>(kind: K): RoleOf<K> => {
  return kind.split(":")[1] as RoleOf<K>;
};
