const UserService = require('../../services/userServices');

const userLoginMutation = async (_, { input }) => {
  return await UserService.loginUser({ input });
};

module.exports = { userLoginMutation };
