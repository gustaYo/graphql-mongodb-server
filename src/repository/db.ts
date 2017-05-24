import config from '../config';
import Mongoose = require("mongoose");
global.Promise = require("q").Promise;
Mongoose.Promise = global.Promise;
class DataAccess {
    static mongooseInstance:any;
    static mongooseConnection:Mongoose.Connection;

    constructor() {
        DataAccess.connect();
    }

    static connect():Mongoose.Connection {
        if (this.mongooseInstance) return this.mongooseInstance;

        this.mongooseConnection = Mongoose.connection;
        this.mongooseConnection.once("open", () => {
            console.log("we're connected! Let's get started\n");
        });
        this.mongooseConnection.on("error", ({name, message}) => {
            console.log("Failed to connect:", name);
            console.log(message);
        });

        this.mongooseInstance = Mongoose.connect(config.db.uri, config.db.options);
        return this.mongooseInstance;
    }
}
DataAccess.connect();
export = DataAccess;
