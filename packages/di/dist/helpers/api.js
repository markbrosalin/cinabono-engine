export const diConfig = (cfg) => cfg;
export const diToken = (name) => ({
    id: Symbol(name),
    name,
    __type__: undefined,
});
