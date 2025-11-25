import { addUC, doubleUC, secretUC } from "../../use-casess/api-core/playground";
export const api = {
    math: { add: addUC },
    ops: { double: doubleUC, _secret: secretUC },
};
