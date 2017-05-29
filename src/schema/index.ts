import {GraphQLSchema,GraphQLObjectType} from 'graphql';
import {makeExecutableSchema, addMockFunctionsToSchema} from 'graphql-tools';

import {resolvers,typeDefs} from './modules';

const Schema: GraphQLSchema = makeExecutableSchema({
  logger: {
    log (e) { console.log('[GraphQL Log]:', e) }
  },
  resolverValidationOptions: {
    requireResolversForNonScalar: false,
  },
  resolvers: resolvers,
  typeDefs: typeDefs,
});
addMockFunctionsToSchema({
  mocks: {},
  preserveResolvers: true,
  schema: Schema,
});

export {Schema};
