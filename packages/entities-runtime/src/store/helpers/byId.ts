import { Insertable } from "../contracts";
import { saveInStoreByKey } from "./base";

export const saveInStoreById = <K, V extends { id: K }>(
	store: Insertable<K, V>,
	data: V | V[]
): void => {
	saveInStoreByKey(store, data, (entity) => entity.id);
};
