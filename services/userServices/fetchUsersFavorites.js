const { users } = require('../../datasources');
const { paginateData } = require('../../utils/pagination');
const { validateAndGetUser } = require('../../utils/validation');

const fetchUsersFavorites = async (
  _,
  { after, before, first, last },
  { user },
) => {
  const getAndValidateUser = await validateAndGetUser({ user });
  if (!getAndValidateUser.success)
    return {
      success: false,
      message: getAndValidateUser.message,
    };
  const getUsersCreatedAppartments = await users.fetchUsersFavorites({
    _id: user.id,
  });

  if (
    getUsersCreatedAppartments &&
    getUsersCreatedAppartments.favorites &&
    getUsersCreatedAppartments.favorites.length !== 0
  ) {
    const { nodes, edges, pageInfo, totalCount } = paginateData({
      data: getUsersCreatedAppartments.favorites,
      after,
      before,
      first,
      last,
    });

    return {
      success: true,
      message: 'FAVORITES_FETCHED_SUCCESSFULLY',
      nodes,
      edges,
      pageInfo,
      totalCount,
      statusCode: 200,
    };
  }
  return {
    success: true,
    message: 'NO_FAVORITES',
    nodes: [],
    edges: [],
    pageInfo: null,
    totalCount: 0,
    statusCode: 200,
  };
};

module.exports = { fetchUsersFavorites };
