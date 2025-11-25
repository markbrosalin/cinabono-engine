export const getBuiltItem = (data) => data.items[0];
export const exportBuilderResult = (res) => {
    return {
        items: res.items,
        scopes: res.scopes,
        linkIds: Array.from(res.linkIds),
        builtItem: getBuiltItem(res),
    };
};
