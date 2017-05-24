export const mergeResolversCustom = (list) => {
    const result = {};
    list.map((some) =>{
        const keys = Object.keys(some);
        keys.map((name) =>{
            if (!result[name]){
                result[name] = {};
            }
            Object.assign(result[name],some[name]);
        });
    });
    return result
}
