import * as express from "express";
import { initialize } from "express-ts-controller";
const controllersRest = []
const moduleFiles = (<any> require).context("./", true, /\.ts/);
moduleFiles.keys().map((moduleName) => {
    if(moduleName.indexOf('index.ts')===-1){
        return controllersRest.push(moduleFiles(moduleName).default);
    }
})
class ControllersRest {

    private _app: express.Express;

    constructor (appExpress:  express.Express) {
        this._app = appExpress;
    }

    get start() {
       return initialize(this._app, controllersRest);
    }
    
}
export = ControllersRest;

