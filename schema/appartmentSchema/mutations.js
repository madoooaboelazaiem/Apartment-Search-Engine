const { gql } = require('apollo-server');

const mutations = gql`
  input AddAppartmentInput {
    name: String!
    description: String
    location: [Float]!
    city: String
    country: String
    numberOfRooms: Int!
    price: Float!
  }
  type ApartmentAddedResponse {
    """
    return appartment errors
    """
    message: AppartmentStatus
    statusCode: Int
    """
    wether the process is success or not
    """
    success: Boolean!
    """
    return created appartment
    """
    appartment: Appartment
  }
  input FavoritesAppartmentInput {
    """
    The id of the appartment to add to favorites.
    """
    appartmentId: String!
  }
  type FavoritesAppartmentResponse {
    message: FavoritesStatus!
    success: Boolean!
    statusCode: Int
  }

  enum FavoritesStatus {
    APPARTMENT_ADDED_TO_Favorites_SUCCESSFULLY
    APPARTMENT_REMOVED_TO_Favorites_SUCCESSFULLY
    ERROR_OCCURRED
    UNAUTHORIZED_ACTION
    INVALID_INPUT
  }
  type Mutation {
    """
    user adds appartment to the appartments database
    """
    addAppartment(input: AddAppartmentInput!): ApartmentAddedResponse!
    """
    Add appartment to user's favorites
    """
    addAppartmentToFavorites(
      input: FavoritesAppartmentInput!
    ): FavoritesAppartmentResponse!
    """
    Remove appartment from user's favorites
    """
    removeAppartmentFromFavorites(
      input: FavoritesAppartmentInput!
    ): FavoritesAppartmentResponse!
  }
`;
module.exports = { mutations };
