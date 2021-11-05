const { graphQLLoader } = require('./graphql');
const { expressLoader } = require('./express');
const { mongoLoader } = require('./mongo');

async function callLoaders(expressApp, port) {
  expressLoader(expressApp);
  mongoLoader();
  graphQLLoader(expressApp, port);
}

module.exports = callLoaders;
