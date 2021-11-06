const UserService = require('../../services/userServices');

const userRegisterMutation = async (_, { input }) => {
  return await UserService.registerUser({ input });
};

module.exports = { userRegisterMutation };
