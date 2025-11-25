import { saveInStoreByKey } from "./base";
export const saveInStoreById = (store, data) => {
    saveInStoreByKey(store, data, (entity) => entity.id);
};
