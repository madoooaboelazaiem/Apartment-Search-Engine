const UserService = require('../../services/userServices');

const getUsersFavoritesQuery = async (
  _,
  { after, before, first = 10, last },
  { user },
) => {
  return await UserService.fetchUsersFavorites(
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

module.exports = { getUsersFavoritesQuery };
