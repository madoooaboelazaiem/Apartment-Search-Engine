const AppartmentService = require('../../services/appartmentServices');

const searchAndFilterAppartments = async (
  _,
  { searchInput, filterInputs, after, before, first = 10, last },
  { user },
) => {
  return await AppartmentService.searchAndFilterAppartments(
    _,
    { searchInput, filterInputs, after, before, first, last },
    { user },
  );
};

module.exports = { searchAndFilterAppartments };
