const { users } = require('../datasources');

const validateAndGetUser = async ({ user }) => {
  if (!user)
    return {
      success: false,
      message: 'UNAUTHORIZED_ACTION',
      statusCode: 401,
      user: null,
    };
  const userAccount = await users.findUser({ _id: user.id });
  if (!userAccount)
    return {
      success: false,
      message: 'USER_NOT_FOUND',
      statusCode: 404,
      user: null,
    };
  return {
    success: true,
    user: userAccount,
    statusCode: 200,
    message: 'USER_FETCHED_SUCCESSFULLY',
  };
};

module.exports = { validateAndGetUser };
