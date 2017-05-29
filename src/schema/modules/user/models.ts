import {Document, Schema} from "mongoose";
import DataAccess = require("../../../repository/db");
var mongoose = DataAccess.mongooseInstance;
var mongooseConnection = DataAccess.mongooseConnection;
export interface IUser {
    name?:string;
    sex?:string;
    email?:string;
}

export interface IUserModel extends IUser, Document {
    fullName():string;
}

export var UserSchema:Schema = new mongoose.Schema({
    createdAt: Date,
    email: String,
    name: String,
    sex: String
});
UserSchema.pre("save", next => {
    let now = new Date();
    if (!this.createdAt) {
        this.createdAt = now;
    }
    next();
});
UserSchema.methods.fullName = function ():string {
    return (this.firstName.trim() + " " + this.lastName.trim());
};
export const User = mongooseConnection.model<IUserModel>("User", UserSchema);

