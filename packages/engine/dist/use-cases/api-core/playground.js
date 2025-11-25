import { defineUseCase } from "../../use-cases/api-core/helpers/defineUseCase";
export const addUC = defineUseCase("add")
    .withDeps({ label: "adder" })
    .public(() => (p) => p.a + p.b);
export const doubleUC = defineUseCase("double")
    .withDeps({})
    .public((ctx) => (p) => ctx.usecases.math.add({ a: p.x, b: p.x }));
export const secretUC = defineUseCase("secret")
    .withDeps({})
    .internal(() => () => "shh");
export const makeFakeBus = () => {
    const events = [];
    return {
        bus: {
            emit(t, d) {
                events.push({ type: t, data: d });
            },
        },
        events,
    };
};
