const AppartmentService = require('../../services/appartmentServices');

const removeAppartmentFromFavoritesMutation = async (
  _,
  { input },
  { user },
) => {
  return await AppartmentService.removeAppartmentToFavorites({ input, user });
};

module.exports = { removeAppartmentFromFavoritesMutation };
