const { appartments } = require('../../datasources');
const { paginateData } = require('../../utils/pagination');
const { validateAndGetUser } = require('../../utils/validation');

const searchForCoupons = async (_, { input }, { user }) => {
  const getAndValidateUser = await validateAndGetUser({ user });
  if (!getAndValidateUser.success)
    return {
      success: false,
      message: getAndValidateUser.message,
    };

  let searchResuts = await appartments.searchForAppartmentsByName({
    searchInput: input.searchInput,
  });
  if (searchResuts && searchResuts.length !== 0) {
    const { nodes, edges, pageInfo, totalCount } = paginateData({
      data: searchResuts,
      after: input.after,
      before: input.before,
      first: input.first,
      last: input.last,
    });
    return {
      success: true,
      status: 'APPARTMENTS_FETCHED_SUCCESSFULLY',
      nodes,
      edges,
      pageInfo,
      totalCount,
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

module.exports = { searchForCoupons };
