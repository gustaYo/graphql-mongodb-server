import * as express from 'express';
import * as bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express';
import OpticsAgent from 'optics-agent';
import * as cors from 'cors';
import * as helmet from 'helmet';
import * as morgan from 'morgan';
import * as ip from 'ip';
import * as ejs from 'ejs';
import * as http from 'http';
import * as https from 'https';
import * as fs from 'fs';
import * as path from 'path';
import * as appRootDir from 'app-root-dir';
import * as rfs from 'rotating-file-stream';
import config from './config';
import { Schema } from './schema';
import RestController = require("./controllers");
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { SubscriptionManager } from "graphql-subscriptions";
import {pubsub} from  './subscriptions';

import subscriptionServer from './subcriptionsServer';

// Default port or given one.
export const GRAPHQL_ROUTE = "/graphql";
export const GRAPHIQL_ROUTE = "/graphiql";

interface IMainOptions {
  enableCors: boolean;
  enableGraphiql: boolean;
  env: string;
  port: number;
  verbose?: boolean;
  useHttps:boolean;
}

/* istanbul ignore next: no need to test verbose print */
function verbosePrint(options) {
  console.log(`GraphQL Server is now running on http${options.useHttps?'s':''}://${ip.address()}:${options.port}${GRAPHQL_ROUTE}`);
  if (true === options.enableGraphiql) {
    console.log(`GraphiQL Server is now running on http${options.useHttps?'s':''}://${ip.address()}:${options.port}${GRAPHIQL_ROUTE}`);
  }
}
export function main(options: IMainOptions) {
  let app = express();

  app.use(helmet());

  app.use(bodyParser.json({ limit: '50mb' }))
  app.use(bodyParser.urlencoded({
    limit: '50mb',
    extended: true,
    parameterLimit: 50000
  }))

  app.set('views', appRootDir.get() + "/views")
  app.engine('html', ejs.renderFile)
  app.set('view engine', 'html')
  const oneYear = 365 * 86400000;
  app.use(express.static(appRootDir.get() + "/public", { maxAge: oneYear }))
  app.use(OpticsAgent.middleware())

  if(config.debug){
    var logDirectory = path.join(appRootDir.get()+'/', 'log')
    fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)
    var accessLogStream = rfs('access.log', {
      interval: '1d', // rotate daily
      path: logDirectory
    })
    app.use(morgan('combined', {stream: accessLogStream}))
    app.use(morgan(options.env));
  }

  if (true === options.enableCors) {
    app.use(GRAPHQL_ROUTE, cors());
  }

  const graphqlExpressResponse = graphqlExpress(request => ({
    schema: Schema,
    formatError: error => ({
      message: error.message,
      locations: error.locations,
      stack: error.stack,
      path: error.path
    }),
    context: {
      request,
      opticsContext: OpticsAgent.context(request)
    }
  }))

  app.use('/graphql', bodyParser.json(), graphqlExpressResponse)

  if (true === options.enableGraphiql) {
    app.use(GRAPHIQL_ROUTE, graphiqlExpress({ endpointURL: GRAPHQL_ROUTE }));
  }
  var webServer;
  if(true === options.useHttps){
    const ssl_options = {
      key: fs.readFileSync(appRootDir.get()+'/ssl/private.key'),
      cert: fs.readFileSync(appRootDir.get()+'/ssl/certificate.pem')
    }
    webServer = https.createServer(ssl_options, app)
  }
  else{
    webServer = http.createServer(app)
  }

  let restFull = new RestController(app);
  restFull.start

  console.log(ip.address(), 'root -> ', appRootDir.get())
  return new Promise((resolve, reject) => {
    let server = webServer.listen(options.port, () => {      
      /* istanbul ignore if: no need to test verbose print */
      if (options.verbose) {
        verbosePrint(options);
      }

      resolve(server);
    }).on("error", (err: Error) => {
      reject(err);
    });
  });
}

/* istanbul ignore if: main scope */
if (require.main === module) {
  // Either to export GraphiQL (Debug Interface) or not.
  const NODE_ENV = process.env.NODE_ENV !== "production" ? "dev" : "production";
  main({
    enableCors: NODE_ENV !== "production",
    enableGraphiql: NODE_ENV !== "production",
    env: process.env.NODE_ENV !== "production" ? "dev" : "production",
    port: config.port,
    verbose: true,
    useHttps: config.useHttps
  })
      .then((server) => {
        subscriptionServer({ schema: Schema, pubsub, server })
  });
}
