import { ucSpec } from "../api/helpers/factories";
export const CORE_API_SPEC = {
    math: {
        add: ucSpec.public({ name: "add" }),
        sub: ucSpec.internal({ name: "private sub" }),
    },
};
