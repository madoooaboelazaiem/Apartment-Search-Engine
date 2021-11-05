const { gql } = require('apollo-server');

const queries = gql`
  type Query {
    """
    return userData if token is valid and user exists
    """
    getUserDataByToken: UserRegisterResponse!
    """
    Get user's favorites (Appartments)
    """
    getUsersFavorites(
      """
      Get items after this cursor.
      """
      after: String
      """
      Get items before this cursor.
      """
      before: String
      """
      Return the first n items.
      """
      first: Int = 10
      """
      Return the last n results.
      """
      last: Int
    ): AppartmentConnection!
  }
`;

module.exports = { queries };
