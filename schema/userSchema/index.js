const { gql } = require('apollo-server');
const { queries } = require('./queries');
const { mutations } = require('./mutations');

const intertwined = gql`
  enum UserStatus {
    UNAUTHORIZED_ACTION
    USER_CREATED_SUCCESSFULLY
    USER_NOT_FOUND
    PARAMS_MISSING
    ERROR_OCCURRED
    ACCOUNT_EXISTS
    PASSWORD_MISMATCH
    LOGIN_SUCCESSFULL
    FAVORITES_FETCHED_SUCCESSFULLY
    USER_FETCHED_SUCCESSFULLY
    NO_FAVORITES
  }
  type User implements Node {
    _id: ID!
    username: String!
    mobile: String!
    email: String!
    location: [Float!]
    favorites: [Appartment!]
    city: String!
    country: String!
  }
`;
const userSchema = [intertwined, queries, mutations];

module.exports = userSchema;
