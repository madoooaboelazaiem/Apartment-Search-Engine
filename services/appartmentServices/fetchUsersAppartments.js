const { appartments } = require('../../datasources');
const { paginateData } = require('../../utils/pagination');
const { validateAndGetUser } = require('../../utils/validation');

const fetchUsersAppartments = async (
  _,
  { after, before, first, last },
  { user },
) => {
  const getAndValidateUser = await validateAndGetUser({ user });
  if (!getAndValidateUser.success)
    return {
      success: false,
      message: getAndValidateUser.message,
      statusCode: 401,
    };
  const getUsersCreatedAppartments = await appartments.getUsersAppartments({
    user: user.id,
  });
  if (getUsersCreatedAppartments && getUsersCreatedAppartments.length !== 0) {
    const { nodes, edges, pageInfo, totalCount } = paginateData({
      data: getUsersCreatedAppartments,
      after,
      before,
      first,
      last,
    });

    return {
      success: true,
      message: 'APPARTMENTS_FETCHED_SUCCESSFULLY',
      nodes,
      edges,
      pageInfo,
      totalCount,
      statusCode: 200,
    };
  }
  return {
    success: true,
    message: 'APPARTMENTS_EMPTY',
    nodes: [],
    edges: [],
    pageInfo: null,
    totalCount: 0,
    statusCode: 200,
  };
};

module.exports = { fetchUsersAppartments };
