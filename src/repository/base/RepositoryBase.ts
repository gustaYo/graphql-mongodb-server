import IRead = require("./../interfaces/base/Read");
import IWrite = require("./../interfaces/base/Write");

import mongoose = require("mongoose");

class RepositoryBase<T extends mongoose.Document> implements IRead<T>, IWrite<T> {

    private _model:mongoose.Model<mongoose.Document>;

    constructor(schemaModel:mongoose.Model<mongoose.Document>) {
        this._model = schemaModel;
    }

    create(item:T, callback:(error:any, result:any) => void) {
        this._model.create(item, callback);
    }

    save(item:T) {
        return new this._model(item).save()
    }

    retrieve() {
        return this._model.find({})
    }

    update(_id:mongoose.Types.ObjectId, item:T) {
        return this._model.update({_id: _id}, item);
    }

    delete(_id:string) {
       return this._model.findByIdAndRemove(_id);
    }

    findById(_id:string) {
        return this._model.findById(_id);
    }

}

export = RepositoryBase;