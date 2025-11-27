import { saveInStoreByKey } from "./base.js";
export const saveInStoreById = (store, data) => {
    saveInStoreByKey(store, data, (entity) => entity.id);
};
