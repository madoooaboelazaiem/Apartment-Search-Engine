const { appartments } = require('../../datasources');
const { paginateData } = require('../../utils/pagination');

const fetchAppartments = async (_, { after, before, first, last }) => {
  const getAllApartments = await appartments.getAllAppartments();
  if (getAllApartments && getAllApartments.length !== 0) {
    const { nodes, edges, pageInfo, totalCount } = paginateData({
      data: getAllApartments,
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

module.exports = { fetchAppartments };
