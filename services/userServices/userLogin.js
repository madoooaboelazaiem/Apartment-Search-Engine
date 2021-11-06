const { users } = require('../../datasources');
const { convertObjectIdToString } = require('../../utils/helper');
const { getToken } = require('../../utils/jwt');
const { comparePassword } = require('../../utils/password');
const handleUserLogin = async ({ input }) => {
  const { username, email, password } = input;
  if ((!username && !email) || !password) {
    return {
      success: false,
      message: 'PARAMS_MISSING',
      statusCode: 400,
    };
  }
  const loginInfo = await users.findUser({
    username,
    email,
  });
  if (!loginInfo) {
    return {
      success: false,
      message: 'USER_NOT_FOUND',
      statusCode: 404,
    };
  }
  const hash = loginInfo.passwordHash;
  const isMatch = await comparePassword({ hash, password });

  return {
    success: isMatch,
    user: isMatch ? loginInfo : null,
    message: isMatch ? 'LOGIN_SUCCESSFULL' : 'PASSWORD_MISMATCH',
    token: isMatch
      ? getToken({ id: convertObjectIdToString(loginInfo._id) })
      : null,
    statusCode: 200,
  };
};

module.exports = { handleUserLogin };
