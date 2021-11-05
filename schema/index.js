const { gql } = require('apollo-server');
const appartmentSchema = require('./appartmentSchema');
const userSchema = require('./userSchema');

const globalSchema = gql`
  scalar Date

  type PageInfo {
    """
    When paginating forwards, are there more items?
    """
    hasNextPage: Boolean!
    """
    When paginating backwards, are there more items?
    """
    hasPreviousPage: Boolean!
    """
    When paginating backwards, the cursor to continue.
    """
    startCursor: String
    """
    When paginating forwards, the cursor to continue.
    """
    endCursor: String
  }

  interface Node {
    """
    The ID of the object.
    """
    _id: ID!
  }
`;

const typeDefs = [globalSchema, ...userSchema, ...appartmentSchema];
module.exports = typeDefs;
