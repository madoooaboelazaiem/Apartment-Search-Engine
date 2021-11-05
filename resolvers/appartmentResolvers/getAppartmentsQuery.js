const AppartmentService = require('../../services/appartmentServices');

const getAppartmentsQuery = async (_, { after, before, first = 10, last }) => {
  return await AppartmentService.fetchAppartments(_, {
    after,
    before,
    first,
    last,
  });
};

module.exports = { getAppartmentsQuery };
