const typeDefs = `#graphql
  enum TransactionTypes {
    income
    expense
  }

  type Account {
    _id: ID!
    balance: Float!
    name: String!
    transactions: [Transaction]!
    userId: String!
  }

  type DeleteAccountPayload {
    _id: ID!
  }

  type Transaction {
    description: String!
    amount: Float!
    type: TransactionTypes!
    startDate: String!
  }

  input TransactionInput {
    description: String!
    amount: Float!
    type: TransactionTypes!
    startDate: String!
  }

  type Query {
    "Query to get accounts array"
    accounts(userId: String!): [Account]
    "Get a single account, provided the account's ID"
    account(id: ID!, userId: String!): Account
  }

  type Mutation {
    addAccount(name: String!, balance: Float!, userId: String!): Account

    updateAccount(accountId: ID!, name: String!, balance: Float!, transactions: [TransactionInput]!): Account

    deleteAccount(accountId: ID!): DeleteAccountPayload
  }
`;

module.exports = typeDefs;
