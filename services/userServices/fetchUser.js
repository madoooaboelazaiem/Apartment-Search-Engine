const { validateAndGetUser } = require('../../utils/validation');

const getUserData = async ({ user }) => {
  return await validateAndGetUser({ user });
};

module.exports = { getUserData };
