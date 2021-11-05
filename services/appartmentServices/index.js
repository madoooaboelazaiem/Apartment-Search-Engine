const { addToFavorites } = require('./addAppartmentToFavorites');
const { removeFromFavorites } = require('./removeAppartmentFromFavorites');
const { createAppartment } = require('./createAppartment');
const { fetchAppartments } = require('./fetchAppartments');
const { fetchUsersAppartments } = require('./fetchUsersAppartments');
const { searchAndFilterAppartments } = require('./searchAndFilterAppartments');
module.exports = {
  createAppartment: createAppartment,
  addAppartmentToFavorites: addToFavorites,
  removeAppartmentToFavorites: removeFromFavorites,
  fetchAppartments: fetchAppartments,
  fetchUsersAppartments: fetchUsersAppartments,
  searchAndFilterAppartments,
};
