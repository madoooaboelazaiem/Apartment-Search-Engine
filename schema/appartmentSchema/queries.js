const { gql } = require('apollo-server');

const queries = gql`
  input appartmentFilterInput {
    """
    city name (Should be a list in the frontend that does not allow the user to enter a city by his own hands)
    """
    city: String
    """
    country name (Should be a list in the frontend that does not allow the user to enter a country by his own hands)
    """
    country: String
    """
    Maximum Distance Range For Location (10,20,30,40,100)KM
    """
    maxDistance: Float
    """
    The number of rooms in a given appartment
    """
    numberOfRooms: Int
  }

  type Query {
    """
    Fetch all created appartments (Does not need validations since it would appear to Guest Users as well)
    """
    getAppartments(
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
    """
    Fetch all created appartments by the logged in user (User's ID is inserted by default from the authorization headers after decoding)
    """
    getUsersAppartments(
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
    """
    Search and Filter Appartments query, where the main inputs are searchInput(Text), city,country and location and the location filter is based on the logged in user's location.
    """
    searchAndFilterAppartments(
      """
      searchInput field is the text written to match a name of the appartment's names listed in the database
      """
      searchInput: String
      """
      Filter Input Has 3 Parameters (city, country and maxDistance)
      """
      filterInputs: appartmentFilterInput
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
