const AppartmentService = require('../../services/appartmentServices');

const addAppartmentToFavoritesMutation = async (_, { input }, { user }) => {
  return await AppartmentService.addAppartmentToFavorites({ input, user });
};

module.exports = { addAppartmentToFavoritesMutation };
