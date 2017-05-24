import { mergeTypes } from 'merge-graphql-schemas';
import {mergeResolversCustom} from '../utils/mergeResolvers';
const moduleFiles = (<any> require).context("./", true, /\.ts/);
const resolversLoad = []
const typesLoad = []
moduleFiles.keys().map((moduleName) => {
    if(moduleName.indexOf('resolvers.ts')!==-1){
        return resolversLoad.push(moduleFiles(moduleName).default);
    }else{
        if(moduleName.indexOf('types.ts')!==-1){
            return typesLoad.push(moduleFiles(moduleName).default);
        }
    }
});
export const resolvers = mergeResolversCustom(resolversLoad)
export const typeDefs =  mergeTypes(typesLoad)
