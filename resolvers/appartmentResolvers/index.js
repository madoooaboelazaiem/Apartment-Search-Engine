const {
  addAppartmentToFavoritesMutation,
} = require('./addAppartmentToFavoritesMutation');
const { addAppartmentMutation } = require('./addAppatmentMutation');
const { getAppartmentsQuery } = require('./getAppartmentsQuery');
const { getUsersAppartments } = require('./getUsersAppartmentsQuery');
const {
  removeAppartmentFromFavoritesMutation,
} = require('./removeAppartmentFromFavoritesMutation');
const {
  searchAndFilterAppartments,
} = require('./searchAndFilterAppartmentsQuery');

const appartmentResolvers = {
  Query: {
    getAppartments: getAppartmentsQuery,
    getUsersAppartments: getUsersAppartments,
    searchAndFilterAppartments: searchAndFilterAppartments,
  },
  Mutation: {
    addAppartment: addAppartmentMutation,
    addAppartmentToFavorites: addAppartmentToFavoritesMutation,
    removeAppartmentFromFavorites: removeAppartmentFromFavoritesMutation,
  },
};

module.exports = { appartmentResolvers };
