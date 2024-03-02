const resolvers = {
  Query: {
    // returns an array of Accounts
    accounts: (_, { userId }, { dataSources }) => {
      return dataSources.accounts.getAccounts(userId);
    },
    // returns a single account, provided the account's ID
    account: (_, { id, userId }, { dataSources }) => {
      return dataSources.accounts.getAccount(id, userId);
    }
  },
  Mutation: {
    addAccount: (_, { name, balance, userId }, { dataSources }) => {
      return dataSources.accounts.addAccount(name, balance, userId);
    },
    updateAccount: (_, { accountId, name, balance, transactions }, { dataSources }) => {
      return dataSources.accounts.updateAccount(accountId, name, balance, transactions);
    },
    deleteAccount: async (_, { accountId }, { dataSources }) => {
      return dataSources.accounts.deleteAccount(accountId);
    }
  }
};

export default resolvers;