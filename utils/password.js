const bcrypt = require('bcrypt');

async function getPasswordHash({ password }) {
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
}

async function comparePassword({ password, hash }) {
  return bcrypt.compare(password, hash);
}

module.exports = { getPasswordHash, comparePassword };
