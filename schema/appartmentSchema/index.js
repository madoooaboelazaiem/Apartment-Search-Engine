const { gql } = require('apollo-server');
const { queries } = require('./queries');
const { mutations } = require('./mutations');

const intertwined = gql`
  type Appartment implements Node {
    _id: ID!
    """
    The name of the appartment
    """
    name: String!
    """
    The regular price of the ítem.
    """
    price: Float!
    """
    The number of rooms available.
    """
    numberOfRooms: Int!
    """
    The urls of the images.
    """
    imageURLs: [String]!
    """
    The longitude and latitude of the branch of this appartment for easier access. [long,lat]
    """
    location: [Float!]
    """
    The city of the appartment
    """
    city: String
    """
    The country of the appartment
    """
    country: String
    """
    The user who created the appartment
    """
    user: User!
  }
  type AppartmentEdge {
    """
    The cursor of the the node corresponding to this edge.
    """
    cursor: String!
    """
    The node corresponding to this edge.
    """
    node: Appartment!
  }
  enum AppartmentStatus {
    UNAUTHORIZED_ACTION
    USER_NOT_FOUND
    APPARTMENTS_FETCHED_SUCCESSFULLY
    Appartment_Updated_Successfully
    APPARTMENT_CREATED_SUCCESSFULLY
    PARAMS_MISSING
    ERROR_OCCURRED
    NO_Favorites
    FAVORITES_FETCHED_SUCCESSFULLY
    NO_FAVORITES
    APPARTMENTS_EMPTY
    WRONG_LOCATION
    USER_LOCATION_MISSING
    MAXDISTANCE_INVALID
    NO_APPARTMENTS_FOUND
    CITY_CANNOT_BE_EMPTY
    COUNTRY_CANNOT_BE_EMPTY
  }
  type AppartmentConnection {
    """
    Boolean flag representing if the query was a success or a failure
    """
    success: Boolean!
    """
    The message representing the error/success message
    """
    message: AppartmentStatus!
    statusCode: Int!
    """
    All nodes in this connection.
    """
    nodes: [Appartment]
    """
    All edges in this connection
    """
    edges: [AppartmentEdge]
    """
    Pagination data for this connection.
    """
    pageInfo: PageInfo
    """
    The total count of items in the dataset.
    """
    totalCount: Int
  }
`;
const appartmentSchema = [intertwined, queries, mutations];

module.exports = appartmentSchema;
