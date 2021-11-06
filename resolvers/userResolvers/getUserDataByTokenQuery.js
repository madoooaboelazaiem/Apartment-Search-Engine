const UserService = require('../../services/userServices');
const getUserDataByTokenQuery = async (_, __, { user }) => {
  return await UserService.fetchUser({ user });
};

module.exports = { getUserDataByTokenQuery };
