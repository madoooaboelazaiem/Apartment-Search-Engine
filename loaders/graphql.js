const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('../schema');
const resolvers = require('../resolvers');

const { authCheck } = require('../utils/jwt');

const graphQLLoader = async (expressServer) => {
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
      return authCheck(req);
    },
  });
  await apolloServer.start();
  apolloServer.applyMiddleware({ app: expressServer, path: '/graphql' });
};

module.exports = { graphQLLoader };
