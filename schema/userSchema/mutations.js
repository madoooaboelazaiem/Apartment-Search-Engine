const { gql } = require('apollo-server');

const mutations = gql`
  input UserRegisterInput {
    username: String!
    email: String!
    mobile: String!
    password: String!
    confirmPassword: String!
    city: String
    country: String
    """
    Enter your longitude in this form [longitude,latitude] in the frontend it is a map where a user points to his location
    """
    location: [Float!]!
  }

  type UserRegisterResponse {
    message: UserStatus!
    success: Boolean!
    user: User
    statusCode: Int
  }
  input UserLoginInput {
    username: String
    email: String
    password: String!
  }
  type UserLoginResponse {
    success: Boolean!
    message: UserStatus
    token: String
    user: User
    statusCode: Int
  }
  type Mutation {
    """
    Register as a user.
    """
    userRegister(input: UserRegisterInput!): UserRegisterResponse!
    """
    Login as a user.
    """
    userLogin(input: UserLoginInput!): UserLoginResponse!
  }
`;
module.exports = { mutations };
