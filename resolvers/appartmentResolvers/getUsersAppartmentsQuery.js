const AppartmentService = require('../../services/appartmentServices');

const getUsersAppartments = async (
  _,
  { after, before, first = 10, last },
  { user },
) => {
  return await AppartmentService.fetchUsersAppartments(
    _,
    {
      after,
      before,
      first,
      last,
    },
    { user },
  );
};

module.exports = { getUsersAppartments };
