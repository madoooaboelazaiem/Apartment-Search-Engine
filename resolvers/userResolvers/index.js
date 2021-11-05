const { getUserDataByTokenQuery } = require('./getUserDataByTokenQuery');
const { userLoginMutation } = require('./userLoginMutation');
const { userRegisterMutation } = require('./userRegisterMutation');
const { getUsersFavoritesQuery } = require('./getUsersFavouritesQuery');
const userResolvers = {
  Query: {
    getUserDataByToken: getUserDataByTokenQuery,
    getUsersFavorites: getUsersFavoritesQuery,
  },
  Mutation: {
    userRegister: userRegisterMutation,
    userLogin: userLoginMutation,
  },
};

module.exports = { userResolvers };
