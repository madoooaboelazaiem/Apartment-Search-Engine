const jwt = require('jsonwebtoken');
const { config } = require('../config');

const getToken = ({ id }) => {
  return jwt.sign({ id }, config.jwtSecret);
};

const getBearerTokenFromRequest = (req) => {
  const token = (req.headers && req.headers.authorization) || '';

  if (token === '') {
    return null;
  }
  // Split at the space
  const bearer = token.split(' ');
  // Get token from array
  const bearerToken = bearer[1];

  if (bearer[0] !== 'Bearer') {
    return null;
  }

  return bearerToken;
};
const authCheck = async (req) => {
  const bearerToken = getBearerTokenFromRequest(req);
  if (!bearerToken) {
    return null;
  }
  const secret = config.jwtSecret;
  let payload;
  try {
    payload = jwt.verify(bearerToken, secret); //throws if invalid
  } catch (error) {
    return null;
  }

  const id = payload.id;

  const user = {
    id,
  };
  return { user };
};

module.exports = { getToken, authCheck };
