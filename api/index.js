import dotenv from 'dotenv';
dotenv.config();

import { MongoClient } from 'mongodb';
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

import typeDefs from './schema.js';
import resolvers from './resolvers.js';
import Accounts from './datasources/accounts.js';

const client = new MongoClient(
  process.env.DB_CONNECTION_STRING
);
client.connect();

const server = new ApolloServer({
  typeDefs,
  resolvers
});

const { url } = await startStandaloneServer(server, {
  context: async ({ req }) => ({
    dataSources: {
      accounts: new Accounts({ modelOrCollection: client.db().collection('accounts') })
    }
  }),
  listen: { port: process.env.PORT }
});

console.log(`
  🚀  Server is running
  📭  Query at ${url}
`);
