const { getUserData } = require('./fetchUser');
const { fetchUsersFavorites } = require('./fetchUsersFavorites');
const { registerUser } = require('./registerUser');
const { handleUserLogin } = require('./userLogin');
module.exports = {
  fetchUser: getUserData,
  registerUser: registerUser,
  loginUser: handleUserLogin,
  fetchUsersFavorites: fetchUsersFavorites,
};
