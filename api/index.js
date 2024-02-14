require('dotenv').config();

const { MongoClient } = require('mongodb');
const { ApolloServer } = require('apollo-server');

const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const Accounts = require('./datasources/accounts');
const Transactions = require('./datasources/transactions');

async function startApolloServer(typeDefs, resolvers) {
  const client = new MongoClient(
    // ``
    process.env.DB_CONNECTION_STRING
  );
  await client.connect();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => ({
      accounts: new Accounts(client.db().collection('accounts')),
      transactions: new Transactions(client.db().collection('transactions'))
    })
  });

  const { url, port } = await server.listen({
    port: process.env.PORT
  });
  console.log(`
    🚀  Server is running
    🔉  Listening on port ${port}
    📭  Query at ${url}
  `);
}

startApolloServer(typeDefs, resolvers);
