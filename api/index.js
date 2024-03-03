require('dotenv').config();

const { MongoClient } = require('mongodb');
const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');

const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const Accounts = require('./datasources/accounts');

async function startApolloServer(typeDefs, resolvers) {
  const client = new MongoClient(
    process.env.DB_CONNECTION_STRING
  );
  await client.connect();

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
    🔉  Listening on port ${process.env.PORT}
    📭  Query at ${url}
  `);
}

startApolloServer(typeDefs, resolvers);
